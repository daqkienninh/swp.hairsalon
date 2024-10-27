package com.example.demo.service;

import com.example.demo.entity.Account;
import com.example.demo.entity.Appointment;
import com.example.demo.entity.AppointmentDetail;
import com.example.demo.entity.Customer;
import com.example.demo.entity.enums.AppointmentStatus;
import com.example.demo.entity.enums.TransactionsEnums;
import com.example.demo.exception.InvalidAppointmentTimeException;
import com.example.demo.repository.AccountRepository;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.CustomerRepository;
import jakarta.transaction.Transactional;
import org.hibernate.validator.internal.util.stereotypes.Lazy;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service
public class AppointmentStatusService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    CustomerRepository customerRepository;

    @Autowired
    AccountRepository accountRepository;

    @Autowired
    private SlotService slotService;

    @Transactional
    @Scheduled(fixedRate = 60000) // Runs every minute
    public void updateAppointmentStatuses() {
        List<Appointment> appointments = appointmentRepository.findAppointmentByIsDeletedFalse();
        LocalDateTime currentTime = LocalDateTime.now();

        for (Appointment appointment : appointments) {
            List<AppointmentDetail> details = appointment.getAppointmentDetails();

            if (details.isEmpty()) continue;

            LocalDateTime earliestStartTime = details.stream()
                    .map(AppointmentDetail::getStartTime)
                    .min(LocalDateTime::compareTo)
                    .orElse(null);

            LocalDateTime latestEndTime = details.stream()
                    .map(AppointmentDetail::getEndTime)
                    .max(LocalDateTime::compareTo)
                    .orElse(null);

            // Check if payment exists and is not failed
//            if (appointment.getPayment() != null &&
//                    !appointment.getPayment().getTransactions().equals(TransactionsEnums.FAIL)) {

            // Check status based on current time and appointment times
            if (appointment.getStatus() != AppointmentStatus.CANCELLED) {

                if (currentTime.isBefore(earliestStartTime)) {
                    appointment.setStatus(AppointmentStatus.APPROVED); // Appointment is upcoming
                } else if (currentTime.isAfter(earliestStartTime) && currentTime.isBefore(latestEndTime)) {
                    appointment.setStatus(AppointmentStatus.IN_PROGRESS); // Appointment is ongoing
                } else if (currentTime.isAfter(latestEndTime)) {
                    appointment.setStatus(AppointmentStatus.DONE); // Appointment is completed

                    if (!appointment.isLoyaltyPointsAwarded()) {
                        // Cộng điểm loyaltyPoint cho khách hàng

                        Account account = accountRepository.findAccountById(appointment.getCustomer().getId());
                        if (account != null && !account.getCustomers().isEmpty()) {
                            Customer foundCustomer = null;

                            // Iterate through the customers to find the one with the matching ID
                            for (Customer customer : account.getCustomers()) {
                                if (customer.getAccount().getId() == appointment.getCustomer().getId()) {
                                    foundCustomer = customer;
                                    break;
                                }
                            }
                            // Check if loyalty points have already been awarded
                            if (foundCustomer != null) {
                                // Update loyalty points based on total price
                                if (appointment.getTotalPrice() >= 1000000) {
                                    foundCustomer.setLoyaltyPoint(foundCustomer.getLoyaltyPoint() + 100);
                                } else if (appointment.getTotalPrice() >= 500000 && appointment.getTotalPrice() < 1000000) {
                                    foundCustomer.setLoyaltyPoint(foundCustomer.getLoyaltyPoint() + 50);
                                } else if (appointment.getTotalPrice() < 500000) {
                                    foundCustomer.setLoyaltyPoint(foundCustomer.getLoyaltyPoint() + 25);
                                }

                                // Save the updated customer
                                customerRepository.save(foundCustomer);
                            }
                        }
                        appointment.setLoyaltyPointsAwarded(true);

                    }
                }
                // Save updated appointment status
                appointmentRepository.save(appointment);

                // Update slot status (ensure this also saves properly)
                slotService.updateSlotStatus(appointment);
            }
        }

    }
}

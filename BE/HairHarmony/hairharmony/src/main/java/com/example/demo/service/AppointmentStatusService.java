package com.example.demo.service;

import com.example.demo.entity.Appointment;
import com.example.demo.entity.AppointmentDetail;
import com.example.demo.entity.enums.AppointmentStatus;
import com.example.demo.entity.enums.TransactionsEnums;
import com.example.demo.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AppointmentStatusService {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    AppointmentService appointmentService;

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
            if (appointment.getPayment() != null &&
                    !appointment.getPayment().getTransactions().equals(TransactionsEnums.FAIL)) {

                // Check status based on current time and appointment times
                if (currentTime.isBefore(earliestStartTime)) {
                    appointment.setStatus(AppointmentStatus.APPROVED); // Appointment is upcoming
                } else if (currentTime.isAfter(earliestStartTime) && currentTime.isBefore(latestEndTime)) {
                    appointment.setStatus(AppointmentStatus.IN_PROGRESS); // Appointment is ongoing
                } else if (currentTime.isAfter(latestEndTime)) {
                    appointment.setStatus(AppointmentStatus.DONE); // Appointment is completed
                }

                // Save updated appointment status
                appointmentRepository.save(appointment);

                // Update slot status (ensure this also saves properly)
                appointmentService.updateSlotStatus(appointment);
            }
        }
    }


}

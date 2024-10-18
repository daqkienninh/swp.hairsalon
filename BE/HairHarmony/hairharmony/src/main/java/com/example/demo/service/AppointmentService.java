package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.entity.enums.AppointmentStatus;
import com.example.demo.entity.enums.StylistStatus;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.exception.InvalidAppointmentTimeException;
import com.example.demo.exception.StylistUnavailableException;
import com.example.demo.model.AppointmentDetailRequest;
import com.example.demo.model.AppointmentRequest;
import com.example.demo.model.SlotRequest;
import com.example.demo.model.SlotResponse;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.repository.ServiceRepository;
import com.example.demo.repository.SlotRepository;
import com.example.demo.repository.StylistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.*;

@Service
public class AppointmentService {

    @Autowired
    AuthenticationService authenticationService;

    @Autowired
    ModelMapper modelMapper;

    @Autowired
    ServiceEntityService serviceEntityService;

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    StylistRepository stylistRepository;

    @Autowired
    AppointmentStatusService appointmentStatusService;

    @Autowired
    SlotRepository slotRepository;

    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
        Account customer = authenticationService.getCurrentAccount();
        Appointment appointment = new Appointment();
        List<AppointmentDetail> appointmentDetails = new ArrayList<>();

        float totalPrice = 0;
        //Get current time
        LocalDateTime currentTime = LocalDateTime.now();

        appointment.setCustomer(customer);
        appointment.setDate(new Date());//current date

        for(AppointmentDetailRequest appointmentDetailRequest: appointmentRequest.getDetails()){
            // Validate that the startTime is not in the past
            if (appointmentDetailRequest.getStartTime().isBefore(currentTime)) {
                throw new InvalidAppointmentTimeException("Thời gian không hợp lệ!");
            }

            long stylistId = appointmentDetailRequest.getStylistId();
            Stylist stylist = stylistRepository.findStylistById(stylistId);

            // Calculate the end time based on the service duration
            ServiceEntity serviceEntity = serviceRepository.findServiceById(appointmentDetailRequest.getServiceId());
            int duration = serviceEntity.getDuration(); // Assuming duration is in minutes
            LocalDateTime startTime = appointmentDetailRequest.getStartTime();
            LocalDateTime endTime = startTime.plusMinutes(duration);
            //Là có được Stylist và thời gian ở bước này, xong ta xuống hàm check stylist có bận hay không

            // Check if the stylist is available
            if (!checkSlotAvailability(stylistId, startTime, endTime)) {
                throw new StylistUnavailableException("Thợ hiện tại đang bận! Xin vui lòng chọn giờ khác !");
            }

            // Create the appointment detail
            AppointmentDetail appointmentDetail = new AppointmentDetail();
            appointmentDetail.setServiceEntity(serviceEntity);
            appointmentDetail.setNote(appointmentDetailRequest.getNote());
            appointmentDetail.setStartTime(startTime);
            appointmentDetail.setEndTime(endTime);
            appointmentDetail.setStylist(stylist);
            appointmentDetail.setPrice(serviceEntity.getTotalPrice());
            appointmentDetail.setAppointment(appointment);
            appointmentDetails.add(appointmentDetail);

            totalPrice += serviceEntity.getTotalPrice();
        }

        appointment.setAppointmentDetails(appointmentDetails);
        appointment.setTotalPrice(totalPrice);

        // Set the initial status
        appointment.setStatus(AppointmentStatus.APPROVED);

        appointment = appointmentRepository.save(appointment);


        // Now that the appointment is saved, create slots
        for (AppointmentDetail detail : appointmentDetails) {
            createSlotForAppointment(detail.getStylist().getId(), detail.getStartTime(), detail.getEndTime(), detail);
        }

        return appointment;
    }

    private void createSlotForAppointment(Long stylistId, LocalDateTime startTime, LocalDateTime endTime, AppointmentDetail appointmentDetail) {
        // Create a new slot for the stylist during the appointment time
        Slot slot = new Slot();
        slot.setStartTime(startTime);
        slot.setEndTime(endTime);
        slot.setStylistStatus(StylistStatus.UNAVAILABLE); // Set the status to UNAVAILABLE when booked
        slot.setSlotStylist(stylistRepository.findStylistById(stylistId)); // Link to the stylist
        slot.setAppointmentDetail(appointmentDetail); // Link to the appointment detail

        // Save the new slot
        slotRepository.save(slot);
    }



    // Check if the stylist is available during the requested slot
    private boolean checkSlotAvailability(Long stylistId, LocalDateTime startTime, LocalDateTime endTime) {
        // Giờ được phép đặt: 8:00 ~ 20:00
        LocalDateTime earliestTime = startTime.withHour(8).withMinute(0).withSecond(0).withNano(0);
        LocalDateTime latestTime = startTime.withHour(20).withMinute(0).withSecond(0).withNano(0);

        // Check if startTime is within the allowed range
        if (startTime.isBefore(earliestTime) || startTime.isAfter(latestTime)) {
            throw new InvalidAppointmentTimeException("Xin vui lòng chọn trong khung giờ làm việc: 8:00 ~ 20:00");
        }

        List<Slot> existingSlots = slotRepository.findBySlotStylistIdAndIsDeletedFalse(stylistId);

        for (Slot slot : existingSlots) {
            LocalDateTime existingStartTime = slot.getStartTime();
            LocalDateTime existingEndTime = slot.getEndTime();

            // Check for overlapping or adjacent times
            if ((startTime.isBefore(existingEndTime) && endTime.isAfter(existingStartTime)) ||
                    startTime.isEqual(existingStartTime) || startTime.isEqual(existingEndTime) ||
                    endTime.isEqual(existingStartTime) || endTime.isEqual(existingEndTime)) {
                return false; // Conflict or adjacency, so stylist is not available
            }
        }
        return true; // No conflict or adjacency, stylist is available
    }

    public void completeAppointment(UUID appointmentId) {
        Appointment appointment = appointmentRepository.findById(appointmentId)
                .orElseThrow(() -> new EntityNotFoundException("Appointment not found!"));

        // Set the status to DONE
        appointment.setStatus(AppointmentStatus.DONE);
        appointmentRepository.save(appointment);

        // Update the slot status based on the appointment details
        updateSlotStatus(appointment);
    }

    private void updateSlotStatus(Appointment appointment) {
        List<AppointmentDetail> details = appointment.getAppointmentDetails();
        for (AppointmentDetail detail : details) {
            // Get the stylist from the appointment detail
            Stylist stylist = detail.getStylist();

            // Assuming you have a method to find the slot by stylist and appointment times
            List<Slot> slots = slotRepository.findBySlotStylistIdAndIsDeletedFalse(stylist.getId());
            for (Slot slot : slots) {
                // Check if the slot overlaps with the appointment's time
                if (detail.getStartTime().isBefore(slot.getEndTime()) && detail.getEndTime().isAfter(slot.getStartTime())) {
                    // Update the stylist status in the slot to AVAILABLE
                    slot.setStylistStatus(StylistStatus.AVAILABLE);
                    slot.setDeleted(true);
                    slotRepository.save(slot); // Save the updated slot
                }
            }
        }
    }


}

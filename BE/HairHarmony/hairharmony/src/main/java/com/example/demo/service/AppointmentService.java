package com.example.demo.service;

import com.example.demo.entity.*;
import com.example.demo.entity.enums.StylistStatus;
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
import org.springframework.stereotype.Service;

import java.time.DayOfWeek;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;

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
    SlotRepository slotRepository;

    public Appointment createAppointment(AppointmentRequest appointmentRequest) {
        Account customer = authenticationService.getCurrentAccount();
        Appointment appointment = new Appointment();
        List<AppointmentDetail> appointmentDetails = new ArrayList<>();

        float totalPrice = 0;

        appointment.setCustomer(customer);
        appointment.setDate(new Date());//current date

        for(AppointmentDetailRequest appointmentDetailRequest: appointmentRequest.getDetails()){
            ServiceEntity serviceEntity = serviceRepository.findServiceById(appointmentDetailRequest.getServiceId());
            AppointmentDetail appointmentDetail = new AppointmentDetail();
            appointmentDetail.setNote(appointmentDetailRequest.getNote());
            appointmentDetail.setPrice(serviceEntity.getTotalPrice());
            appointmentDetail.setAppointment(appointment);
            appointmentDetail.setServiceEntity(serviceEntity);
            appointmentDetails.add(appointmentDetail);

            totalPrice += serviceEntity.getTotalPrice();
        }

        appointment.setAppointmentDetails(appointmentDetails);
        appointment.setTotalPrice(totalPrice);

        return appointmentRepository.save(appointment);
    }

    // Method to create a slot for a stylist
    public SlotResponse createSlotForStylist(Long stylistId, DayOfWeek dayOfWeek, LocalDateTime startTime, LocalDateTime endTime) {
        // Check if stylist exists
        Optional<Stylist> stylistOptional = stylistRepository.findById(stylistId);
        if (!stylistOptional.isPresent()) {
            throw new IllegalArgumentException("Stylist not found");
        }

        // Check if the slot overlaps with any existing slot for the stylist
        boolean isAvailable = checkSlotAvailability(stylistId, startTime, endTime);
        if (!isAvailable) {
            throw new IllegalArgumentException("The stylist is not available in the this time.");
        }

        // Create and save the new slot
        Slot newSlot = new Slot();
        newSlot.setSlotStylist(stylistOptional.get());
        newSlot.setDayOfWeek(dayOfWeek);
        newSlot.setStartTime(startTime);
        newSlot.setEndTime(endTime);
        newSlot.setStylistStatus(StylistStatus.AVAILABLE);

        slotRepository.save(newSlot);

        // Use ModelMapper to map Slot to SlotResponse
        return modelMapper.map(newSlot, SlotResponse.class);
    }



    // Check if the stylist is available during the requested slot
    private boolean checkSlotAvailability(Long stylistId, LocalDateTime startTime, LocalDateTime endTime) {
        List<Slot> existingSlots = slotRepository.findBySlotStylistIdAndIsDeletedFalse(stylistId);

        for (Slot slot : existingSlots) {
            LocalDateTime existingStartTime = slot.getStartTime();
            LocalDateTime existingEndTime = slot.getEndTime();

            // Check for overlapping times
            if (startTime.isBefore(existingEndTime) && endTime.isAfter(existingStartTime)) {
                return false; // Overlapping, so stylist is not available
            }
        }
        return true; // No overlap, stylist is available
    }

}

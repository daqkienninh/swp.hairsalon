package com.example.demo.model;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.UUID;

@Data
public class AppointmentDetailRequest {
    UUID serviceId;
    long stylistId;
    LocalDateTime startTime;
    LocalDateTime endTime;
    String note;

}

package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Data
public class Shift {
    @Column(unique = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    long id;

    DayOfWeek dayOfWeek;

    LocalDateTime startTime;

    LocalDateTime endTime;

    @JsonIgnore
    boolean isDeleted = false;

    @ManyToOne
    @JoinColumn(name = "stylist_id")
    Stylist shiftStylist;
}

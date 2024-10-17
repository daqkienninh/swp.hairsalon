package com.example.demo.entity;

import com.example.demo.entity.enums.StylistStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;

import java.time.DayOfWeek;
import java.time.LocalDateTime;


@Entity
@Data
public class Slot {
    @Column(unique = true)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    long id;

    DayOfWeek dayOfWeek;

    LocalDateTime startTime;

    LocalDateTime endTime;

    StylistStatus stylistStatus;

    @JsonIgnore
    boolean isDeleted = false;

    @ManyToOne
    @JoinColumn(name = "stylist_id")
    Stylist slotStylist;
}

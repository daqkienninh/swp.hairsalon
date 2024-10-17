package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class Appointment {
    @Column(unique = true)
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    UUID id;

    Date date;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    float totalPrice;

    @JsonIgnore
    boolean isDeleted = false;

    @ManyToOne
    @JoinColumn(name = "customer_íd")
    @JsonIgnore
    Account customer;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL)
    List<AppointmentDetail> appointmentDetails;


}
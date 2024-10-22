package com.example.demo.entity;

import com.example.demo.entity.enums.AppointmentStatus;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.Comparator;
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

    @Enumerated(EnumType.STRING)
    AppointmentStatus status;

    @JsonIgnore
    boolean isDeleted = false;

    @ManyToOne
    @JoinColumn(name = "customer_id")
    @ToString.Exclude
    @JsonIgnore
    Account customer;

    @OneToMany(mappedBy = "appointment", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    @JsonIgnore
            @ToString.Exclude
    List<AppointmentDetail> appointmentDetails;

    @OneToOne(mappedBy = "appointments")
    @ToString.Exclude
    Payment payment;

}

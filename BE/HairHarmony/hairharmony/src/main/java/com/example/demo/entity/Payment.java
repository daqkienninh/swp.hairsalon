package com.example.demo.entity;

import com.example.demo.entity.enums.PaymentEnums;
import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import lombok.Data;
import lombok.ToString;

import java.util.Date;
import java.util.Set;

@Entity
@Data
public class Payment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    long id;

    Date createAt;

    @Enumerated(EnumType.STRING)
    PaymentEnums payment_method;

    @OneToOne
    @JoinColumn(name = "appointment_id")
    @ToString.Exclude
    Appointment appointments;

    @OneToMany(mappedBy = "payment", cascade = CascadeType.ALL)
    @ToString.Exclude
    Set<Transactions> transactions;



}

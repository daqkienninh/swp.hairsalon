package com.example.demo.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonProperty;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Entity
@Data
public class Manager {
    @Column(unique = true) // không được trùng
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    long id;

    @NotBlank(message = "Name cannot blank!")
    String fullName;

    String image;

    String sex;

    String description;

    int level;

    @JsonIgnore//không bắt nhập thông tin trên swagger
    boolean isDeleted = false;

    @ManyToOne
    @JoinColumn(name = "account_id")
    Account account;


}

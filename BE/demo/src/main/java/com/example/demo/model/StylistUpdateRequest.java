package com.example.demo.model;

import jakarta.persistence.Column;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class StylistUpdateRequest {
    String fullName;

    String image;
    String sex;
    String description;

    @Column(unique = true) // không được trùng
    @Email(message = "Email not valid!")
    String email;

    @Column(unique = true) // không được trùng
    @Pattern(regexp = "(84|0[3|5|7|8|9])+(\\d{8})", message = "Phone invalid!")
    String phone;

    @Size(min = 8, message = "Password must be at least 8 characters!")
    String password;
}

package com.example.demo.model;

import jakarta.validation.constraints.Size;
import lombok.Data;

@Data
public class ResetPasswordRequest {
    @Size(min = 8, message = "Password must be at least 8 characters!")
    String password;
}

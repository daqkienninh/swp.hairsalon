package com.example.demo.model;

import lombok.Data;

@Data
public class AccountResponse {
    String id;
    String password;
    String fullName;
    String email;
    String phone;
    String role;
    String image;
    String sex;
    String token;

}

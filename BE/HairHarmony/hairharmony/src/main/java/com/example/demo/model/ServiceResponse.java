package com.example.demo.model;

import lombok.Data;

@Data
public class ServiceResponse {
    long id;
    String name;
    String description;
    String type;
    String image;
    int duration;
    float price;
    int discount;
    float totalPrice;

}

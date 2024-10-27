package com.example.demo.api;

import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/salary")
@CrossOrigin("*")
@SecurityRequirement(name = "api")
public class SalaryAPI {

}

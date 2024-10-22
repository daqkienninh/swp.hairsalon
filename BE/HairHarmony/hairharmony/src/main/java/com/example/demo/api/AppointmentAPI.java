package com.example.demo.api;

import com.example.demo.entity.Account;
import com.example.demo.entity.Appointment;
import com.example.demo.model.AppointmentRequest;
import com.example.demo.repository.AppointmentRepository;
import com.example.demo.service.AppointmentService;
import com.example.demo.service.AuthenticationService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api/appointment")
@CrossOrigin("*")
@SecurityRequirement(name = "api")
public class AppointmentAPI {

    @Autowired
    AppointmentRepository appointmentRepository;

    @Autowired
    AppointmentService appointmentService;

    @Autowired
    AuthenticationService authenticationService;

    @PostMapping
    public ResponseEntity createAppointment(@RequestBody AppointmentRequest appointmentRequest) {
        Appointment appointment = appointmentService.createAppointment(appointmentRequest);
        return ResponseEntity.ok(appointment);
    }

    @PostMapping("payment")
    public ResponseEntity createPayment(@RequestBody AppointmentRequest appointmentRequest) throws Exception {
        String vnPayURL = appointmentService.createUrl(appointmentRequest);
        return ResponseEntity.ok(vnPayURL);
    }

    @PostMapping("transaction")
    public ResponseEntity createTransaction(@RequestParam UUID appointmentID) throws Exception {
         appointmentService.createTransactions(appointmentID);
        return ResponseEntity.ok("Successful transaction!");
    }

    @GetMapping
    public ResponseEntity getAllAppointments() {
        Account account = authenticationService.getCurrentAccount();
        List<Appointment> appointments = appointmentRepository.findAppointmentByCustomer(account);
        return ResponseEntity.ok(appointments);
    }

}

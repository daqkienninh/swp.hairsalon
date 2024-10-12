package com.example.demo.api;

import com.example.demo.entity.Stylist;
import com.example.demo.model.StylistRequest;
import com.example.demo.model.StylistUpdateRequest;
import com.example.demo.service.StylistService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/stylist")
@CrossOrigin("*")
@SecurityRequirement(name = "api")
public class StylistAPI
{
    @Autowired
    StylistService stylistService;

    @PostMapping
    public ResponseEntity createStylist(@Valid @RequestBody StylistRequest stylist) {
        Stylist newStylist = stylistService.createStylist(stylist);
        return ResponseEntity.ok(newStylist);
    }

    @GetMapping
    public ResponseEntity getAllStylists() {
        List<Stylist> stylists = stylistService.getAllStylists();
        return ResponseEntity.ok(stylists);
    }

    //tìm stylist bằng id
    @GetMapping("{stylistId}")
    public ResponseEntity getStylistById(@PathVariable long stylistId) {
        Stylist stylist = stylistService.getStylistById(stylistId);
        return ResponseEntity.ok(stylist);
    }

    //tìm những stylist bằng level
    @GetMapping("/level:{stylistLevel}")
    public ResponseEntity getStylistsByLevel(@PathVariable int stylistLevel) {
        List<Stylist> stylists = stylistService.getStylistsByLevel(stylistLevel);
        return ResponseEntity.ok(stylists);
    }


    @PutMapping("{stylistId}")
    public ResponseEntity updateStylist(@PathVariable long stylistId, @Valid @RequestBody StylistUpdateRequest stylist) {
        Stylist updatedStylist = stylistService.updateStylist(stylistId, stylist);
        return ResponseEntity.ok(updatedStylist);
    }

    @DeleteMapping("{stylistId}")
    public ResponseEntity deleteStylist(@PathVariable long stylistId) {
        Stylist deletedStylist = stylistService.deleteStylist(stylistId);
        return ResponseEntity.ok(deletedStylist);
    }



}

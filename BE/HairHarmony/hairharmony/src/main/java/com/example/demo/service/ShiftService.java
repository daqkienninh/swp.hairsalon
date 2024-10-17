package com.example.demo.service;

import com.example.demo.repository.ShiftRepository;
import com.example.demo.repository.StylistRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ShiftService {

    @Autowired
    ShiftRepository shiftRepository;

    @Autowired
    StylistRepository stylistRepository;

    @Autowired
    ModelMapper modelMapper;


}

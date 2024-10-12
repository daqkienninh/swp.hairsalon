package com.example.demo.api;

import com.example.demo.entity.ServiceEntity;
import com.example.demo.model.ServiceRequest;
import com.example.demo.model.ServiceResponse;
import com.example.demo.service.ServiceEntityService;
import io.swagger.v3.oas.annotations.security.SecurityRequirement;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/service")
@CrossOrigin("*")
@SecurityRequirement(name = "api")
public class ServiceAPI {
    @Autowired
    ServiceEntityService serviceEntityService;


    @PostMapping
    public ResponseEntity createService (@Valid @RequestBody ServiceRequest service) {
        ServiceResponse newService = serviceEntityService.createService(service);
        return ResponseEntity.ok(newService);
    }

    @GetMapping
    public ResponseEntity  getAllServices() {
        List<ServiceEntity> services = serviceEntityService.getAllServices();
        return ResponseEntity.ok(services);
    }

    //tìm service bằng id
    @GetMapping("{serviceId}")
    public ResponseEntity<ServiceEntity> getServiceById(@PathVariable Long serviceId) {
        ServiceEntity service = serviceEntityService.getServiceById(serviceId);
        return ResponseEntity.ok(service);
    }


    //tìm service bằng name
    @GetMapping("{serviceName}")
    public ResponseEntity getServiceByName(String serviceName){
        ServiceEntity service  = serviceEntityService.getServiceByName(serviceName);
        return ResponseEntity.ok(service);
    }

    //tìm các service có trong type
    @GetMapping("{serviceType}")
    public ResponseEntity getServiceByType(String serviceType){
        List<ServiceEntity> services = serviceEntityService.getServiceByType(serviceType);
        return ResponseEntity.ok(services);
    }

    @PutMapping("{serviceId}")
    public ResponseEntity updateService(@PathVariable long serviceId, @Valid @RequestBody ServiceEntity service) {
        ServiceEntity updatedService = serviceEntityService.updateServiceById(serviceId, service);
        return ResponseEntity.ok(updatedService);
    }

    @DeleteMapping("{serviceId}")
    public ResponseEntity deleteService(@PathVariable long serviceId) {
        ServiceEntity updatedService = serviceEntityService.deleteServiceById(serviceId);
        return ResponseEntity.ok(updatedService);
    }


}

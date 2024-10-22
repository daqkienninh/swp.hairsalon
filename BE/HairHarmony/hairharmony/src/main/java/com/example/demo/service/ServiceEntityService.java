package com.example.demo.service;

import com.example.demo.entity.Account;
import com.example.demo.entity.ServiceEntity;
import com.example.demo.exception.DuplicateEntity;
import com.example.demo.exception.EntityNotFoundException;
import com.example.demo.model.ServiceRequest;
import com.example.demo.model.ServiceResponse;
import com.example.demo.repository.ServiceRepository;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.management.ServiceNotFoundException;
import java.util.List;
import java.util.UUID;


@Service
public class ServiceEntityService {

    @Autowired
    ServiceRepository serviceRepository;

    @Autowired
    ModelMapper modelMapper;


    //Create
    public ServiceResponse createService(ServiceRequest serviceRequest){
        ServiceEntity newService = modelMapper.map(serviceRequest, ServiceEntity.class);
        try{
            newService.setTotalPrice(serviceRequest.getPrice()*(1-((float) serviceRequest.getDiscount() /100)));
            ServiceEntity service = serviceRepository.save(newService);
            return modelMapper.map(service, ServiceResponse.class);
        }catch (Exception e){
            throw new DuplicateEntity("Duplicate service! Fail to create!");
        }
    }

    //Read
    public List<ServiceEntity> getAllServices(){
        List<ServiceEntity> serviceEntities = serviceRepository.findServiceByIsDeletedFalse();
        return serviceEntities;
    }

    //Update
    public ServiceEntity updateServiceById(UUID id, ServiceEntity serviceEntity){
        ServiceEntity oldService = getServiceById(id);
        oldService.setName(serviceEntity.getName());
        oldService.setDescription(serviceEntity.getDescription());
        oldService.setImage(serviceEntity.getImage());
        oldService.setPrice(serviceEntity.getPrice());
        oldService.setDuration(serviceEntity.getDuration());
        oldService.setDiscount(serviceEntity.getDiscount());
        oldService.setTotalPrice(serviceEntity.getTotalPrice());
        return serviceRepository.save(oldService);
    }

    //Delete
    public ServiceEntity deleteServiceById(UUID id){
        ServiceEntity oldService = getServiceById(id);
        oldService.setDeleted(true);
        return serviceRepository.save(oldService);
    }

    public ServiceEntity getServiceById(UUID id){
        ServiceEntity service = serviceRepository.findServiceById(id);
        if(service == null){
            throw new EntityNotFoundException("Service not found!");
        }
        return service;
    }

    public ServiceEntity getServiceByName(String name) {
        ServiceEntity service = serviceRepository.findServiceByName(name);
        if(service == null){
            throw new EntityNotFoundException("Service not found!");
        }
        return service;
    }

    public List<ServiceEntity> getServiceByType(String type){
        List<ServiceEntity> serviceEntities = serviceRepository.findServiceByType(type);
        if(serviceEntities == null){
            throw new EntityNotFoundException("No service can be found in this type!");
        }
        return serviceEntities;
    }

}

package com.example.demo.repository;

import com.example.demo.entity.ServiceEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.UUID;

public interface ServiceRepository extends JpaRepository<ServiceEntity, UUID> {
    ServiceEntity findServiceById(UUID id);
    ServiceEntity findServiceByName(String name);
    List<ServiceEntity> findServiceByIsDeletedFalse();
    List<ServiceEntity> findServiceByType(String type);
}

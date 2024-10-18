package com.example.demo.repository;

import com.example.demo.entity.Slot;
import com.example.demo.entity.Stylist;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SlotRepository extends JpaRepository<Slot, Long> {
    Slot findSlotById(long id);
    List<Slot> findBySlotStylistIdAndIsDeletedFalse(Long stylistId);;
}

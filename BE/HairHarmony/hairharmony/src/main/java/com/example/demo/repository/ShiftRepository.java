package com.example.demo.repository;

import com.example.demo.entity.Shift;
import com.example.demo.entity.Stylist;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface ShiftRepository extends JpaRepository<Shift, Long> {
    Shift findShiftById(long id);

//    List<Stylist> findStylistByShiftStylist(Stylist stylist);
    List<Shift> findShiftByIsDeletedFalse();
}

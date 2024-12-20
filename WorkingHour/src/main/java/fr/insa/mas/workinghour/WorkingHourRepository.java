package com.example.workinghour.repository;

import com.example.workinghour.model.WorkingHour;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface WorkingHourRepository extends JpaRepository<WorkingHour, Long> {
}

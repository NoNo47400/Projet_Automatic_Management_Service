package com.example.workinghour.controller;

import com.example.workinghour.model.WorkingHour;
import com.example.workinghour.repository.WorkingHourRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/workinghours")
public class WorkingHourController {

    @Autowired
    private WorkingHourRepository workingHourRepository;

    @GetMapping
    public List<WorkingHour> getAllWorkingHours() {
        return workingHourRepository.findAll();
    }

    @GetMapping("/{id}")
    public WorkingHour getWorkingHourById(@PathVariable Long id) {
        return workingHourRepository.findById(id).orElse(null);
    }

    @PostMapping
    public WorkingHour createWorkingHour(@RequestBody WorkingHour workingHour) {
        return workingHourRepository.save(workingHour);
    }

    @PutMapping("/{id}")
    public WorkingHour updateWorkingHour(@PathVariable Long id, @RequestBody WorkingHour workingHourDetails) {
        WorkingHour workingHour = workingHourRepository.findById(id).orElse(null);
        if (workingHour != null) {
            workingHour.setRoomId(workingHourDetails.getRoomId());
            workingHour.setStartTime(workingHourDetails.getStartTime());
            workingHour.setEndTime(workingHourDetails.getEndTime());
            workingHour.setCurrentTime(workingHourDetails.getCurrentTime());
            return workingHourRepository.save(workingHour);
        }
        return null;
    }

    @DeleteMapping("/{id}")
    public void deleteWorkingHour(@PathVariable Long id) {
        workingHourRepository.deleteById(id);
    }
}

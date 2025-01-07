package fr.insa.mas.WorkingHours;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Column;
import jakarta.persistence.Table;
import java.time.LocalTime;

@Entity
@Table(name = "working_hours")
public class WorkingHour {
    // Attributes
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "working_hour_name", nullable = false)
    private String workingHourName;  // Changed from working_hourName to match JSON
    
    @Column(name = "start_time", nullable = false)
    private LocalTime startTime;     // Changed from start_time to match JSON
    
    @Column(name = "end_time", nullable = false)
    private LocalTime endTime;       // Changed from end_time to match JSON
    
    @Column(name = "current_time_value", nullable = false)
    private LocalTime currentTime;   // Changed from current_time_value to match JSON

    // Getters and setters with corrected names
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkingHourName() {
        return workingHourName;
    }

    public void setWorkingHourName(String workingHourName) {
        this.workingHourName = workingHourName;
    }

    public LocalTime getStartTime() {
        return startTime;
    }

    public void setStartTime(LocalTime startTime) {
        this.startTime = startTime;
    }

    public LocalTime getEndTime() {
        return endTime;
    }

    public void setEndTime(LocalTime endTime) {
        this.endTime = endTime;
    }

    public LocalTime getCurrentTime() {
        return currentTime;
    }

    public void setCurrentTime(LocalTime currentTime) {
        this.currentTime = currentTime;
    }

}
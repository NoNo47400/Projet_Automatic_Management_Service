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
    private String working_hourName;

    @Column(name = "room_id", nullable = false)
    private Long roomId;
    
    @Column(name = "start_time", nullable = false)
    private LocalTime start_time;

    @Column(name = "end_time", nullable = false)
    private LocalTime end_time;

    @Column(name = "current_time_value", nullable = false)
    private LocalTime current_time_value;

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getWorkingHourName() {
        return working_hourName;
    }

    public void setWorkingHourName(String working_hourName) {
        this.working_hourName = working_hourName;
    }

    public Long getRoomId() {
        return roomId;
    }

    public void setRoomId(Long roomId) {
        this.roomId = roomId;
    }

    public LocalTime getStartTime() {
        return start_time;
    }

    public void updateStartTime(LocalTime start_time) {
        this.start_time = start_time;
    }

    public LocalTime getEndTime() {
        return end_time;
    }

    public void updateEndTime(LocalTime end_time) {
        this.end_time = end_time;
    }

    public LocalTime getCurrentTime() {
        return current_time_value;
    }

    public void updateCurrentTime(LocalTime current_time_value) {
        this.current_time_value = current_time_value;
    }

}
package com.example.workinghour.model;

import javax.persistence.*;

@Entity
@Table(name = "working_hour")
public class WorkingHour {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "room_id", nullable = false)
    private Long roomId;

    @Column(name = "start_time", nullable = false)
    private String startTime;

    @Column(name = "end_time", nullable = false)
    private String endTime;

    @Column(name = "current_time", nullable = false)
    private String currentTime;

    // Getters and setters
    // ...existing code...
}

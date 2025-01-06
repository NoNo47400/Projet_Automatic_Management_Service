package fr.insa.mas.WorkingHours;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/working_hours")
public class WorkingHourController {

    @Autowired
    private WorkingHoursRepository workingHoursRepository;

    @GetMapping
    public List<WorkingHour> getAllWorkingHours() {
        return workingHoursRepository.findAll();
    }

    @GetMapping("/{id}")
    public WorkingHour getWorkingHour(@PathVariable Long id) {
        return workingHoursRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public WorkingHour createWorkingHour(@RequestBody WorkingHour request) {
        return workingHoursRepository.save(request);
    }

    @PutMapping("/{id}/start_time")
    public WorkingHour updateStartTime(@RequestBody WorkingHour updatedWorkingHour, @PathVariable Long id) {
        WorkingHour request = workingHoursRepository.findById(id).orElseThrow();
        request.updateStartTime(updatedWorkingHour.getStartTime());
        return workingHoursRepository.save(request);
    }

    @PutMapping("/{id}/end_time")
    public WorkingHour updateEndTime(@RequestBody WorkingHour updatedWorkingHour, @PathVariable Long id) {
        WorkingHour request = workingHoursRepository.findById(id).orElseThrow();
        request.updateEndTime(updatedWorkingHour.getEndTime());
        return workingHoursRepository.save(request);
    }

    @PutMapping("/{id}/current_time")
    public WorkingHour updateCurrentTime(@RequestBody WorkingHour updatedWorkingHour, @PathVariable Long id) {
        WorkingHour request = workingHoursRepository.findById(id).orElseThrow();
        request.updateCurrentTime(updatedWorkingHour.getCurrentTime());
        return workingHoursRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteWorkingHour(@PathVariable Long id) {
        workingHoursRepository.deleteById(id);
        return "Success";
    }

}
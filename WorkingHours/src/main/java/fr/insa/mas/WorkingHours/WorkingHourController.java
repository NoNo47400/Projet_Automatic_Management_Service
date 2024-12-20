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
    public List<Door> getAllDoors() {
        return workingHoursRepository.findAll();
    }

    @GetMapping("/{id}")
    public Door getDoor(@PathVariable Long id) {
        return workingHoursRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Door createDoor(@RequestBody Door request) {
        return workingHoursRepository.save(request);
    }

    @PutMapping("/{id}")
    public Door updateClosed(@RequestBody Door updatedDoor, @PathVariable Long id) {
        Door request = workingHoursRepository.findById(id).orElseThrow();
        request.updateClosed(updatedDoor.getClosed());
        return workingHoursRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteDoor(@PathVariable Long id) {
        workingHoursRepository.deleteById(id);
        return "Success";
    }

}
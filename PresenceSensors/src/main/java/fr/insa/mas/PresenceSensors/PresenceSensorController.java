package fr.insa.mas.PresenceSensors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/sensors")
public class PresenceSensorController {

    @Autowired
    private PresenceSensorsRepository presenceSensorsRepository;

    @GetMapping
    public List<PresenceSensor> getAllSensors() {
        return presenceSensorsRepository.findAll();
    }

    @GetMapping("/{id}")
    public PresenceSensor getSensor(@PathVariable Long id) {
        return presenceSensorsRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public PresenceSensor createSensor(@RequestBody PresenceSensor request) {
        return presenceSensorsRepository.save(request);
    }

    @PutMapping("/{id}")
    public PresenceSensor updateActive(@RequestBody PresenceSensor updatedSensor, @PathVariable Long id) {
        PresenceSensor request = presenceSensorsRepository.findById(id).orElseThrow();
        request.updateActive(updatedSensor.getActive());
        return presenceSensorsRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteSensor(@PathVariable Long id) {
        presenceSensorsRepository.deleteById(id);
        return "Success";
    }

}
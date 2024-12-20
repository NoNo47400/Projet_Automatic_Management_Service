package fr.insa.mas.Lights;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/lights")
public class LightController {

    @Autowired
    private LightsRepository lightRepository;

    @GetMapping
    public List<Light> getAllAlarms() {
        return lightRepository.findAll();
    }

    @GetMapping("/{id}")
    public Light getAlarm(@PathVariable Long id) {
        return lightRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Light createAlarm(@RequestBody Light request) {
        return lightRepository.save(request);
    }

    @PutMapping("/{id}")
    public Light updateActive(@RequestBody Light updatedLight, @PathVariable Long id) {
        Light request = lightRepository.findById(id).orElseThrow();
        request.updateActive(updatedLight.getActive());
        return lightRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteAlarm(@PathVariable Long id) {
        lightRepository.deleteById(id);
        return "Success";
    }

}
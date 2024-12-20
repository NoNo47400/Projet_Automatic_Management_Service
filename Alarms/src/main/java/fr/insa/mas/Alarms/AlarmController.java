package fr.insa.mas.Alarms;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alarms")
public class AlarmController {

    @Autowired
    private AlarmsRepository alarmRepository;

    @GetMapping
    public List<Alarm> getAllAlarms() {
        return alarmRepository.findAll();
    }

    @GetMapping("/{id}")
    public Alarm getAlarm(@PathVariable Long id) {
        return alarmRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Alarm createAlarm(@RequestBody Alarm request) {
        return alarmRepository.save(request);
    }

    @PutMapping("/{id}")
    public Alarm updateActive(@RequestBody Alarm updatedAlarm, @PathVariable Long id) {
        Alarm request = alarmRepository.findById(id).orElseThrow();
        request.updateActive(updatedAlarm.getActive());
        return alarmRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteAlarm(@PathVariable Long id) {
        alarmRepository.deleteById(id);
        return "Success";
    }

}
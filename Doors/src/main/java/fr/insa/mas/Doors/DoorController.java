package fr.insa.mas.Doors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doors")
public class DoorController {

    @Autowired
    private DoorsRepository doorRepository;

    @GetMapping
    public List<Door> getAllDoors() {
        return doorRepository.findAll();
    }

    @GetMapping("/{id}")
    public Door getDoor(@PathVariable Long id) {
        return doorRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Door createDoor(@RequestBody Door request) {
        return doorRepository.save(request);
    }

    @PutMapping("/{id}")
    public Door updateClosed(@RequestBody Door updatedDoor, @PathVariable Long id) {
        Door request = doorRepository.findById(id).orElseThrow();
        request.updateClosed(updatedDoor.getClosed());
        return doorRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteDoor(@PathVariable Long id) {
        doorRepository.deleteById(id);
        return "Success";
    }

}
package fr.insa.mas.Windows;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/doors")
public class WindowController {

    @Autowired
    private WindowsRepository windowRepository;

    @GetMapping
    public List<Window> getAllWindows() {
        return windowRepository.findAll();
    }

    @GetMapping("/{id}")
    public Window getWindow(@PathVariable Long id) {
        return windowRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Window createWindow(@RequestBody Window request) {
        return windowRepository.save(request);
    }

    @PutMapping("/{id}")
    public Window updateClosed(@RequestBody Window updatedWindow, @PathVariable Long id) {
        Window request = windowRepository.findById(id).orElseThrow();
        request.updateClosed(updatedWindow.getClosed());
        return windowRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteWindow(@PathVariable Long id) {
        windowRepository.deleteById(id);
        return "Success";
    }

}
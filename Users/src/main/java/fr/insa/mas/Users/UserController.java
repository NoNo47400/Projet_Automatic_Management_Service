package fr.insa.mas.Users;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UsersRepository userRepository;

    @GetMapping
    public List<Users> getAllUsers() {
        return userRepository.findAll();
    }

    @GetMapping("/{id}")
    public Users getUser(@PathVariable Long id) {
        return userRepository.findById(id).orElseThrow();
    }

    @PostMapping
    public Users createUser(@RequestBody Users request) {
        return userRepository.save(request);
    }

    @DeleteMapping("/{id}")
    public String deleteUser(@PathVariable Long id) {
        userRepository.deleteById(id);
        return "Success";
    }

}
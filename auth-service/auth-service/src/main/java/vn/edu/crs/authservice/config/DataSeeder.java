package vn.edu.crs.authservice.config;

import vn.edu.crs.authservice.entity.User;
import vn.edu.crs.authservice.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public void run(String... args) {
        if (userRepository.findByUsername("admin").isEmpty()) {
            User admin = new User();
            admin.setUsername("admin");
            admin.setPassword(passwordEncoder.encode("admin123"));
            admin.setRole("ADMIN");
            userRepository.save(admin);
        }

        if (userRepository.findByUsername("student1").isEmpty()) {
            User student = new User();
            student.setUsername("student1");
            student.setPassword(passwordEncoder.encode("student123"));
            student.setRole("STUDENT");
            userRepository.save(student);
        }
    }
}
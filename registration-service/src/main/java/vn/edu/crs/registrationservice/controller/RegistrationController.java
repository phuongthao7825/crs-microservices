package vn.edu.crs.registrationservice.controller;

import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import vn.edu.crs.registrationservice.dto.RegistrationRequestDTO;

@RestController
@RequestMapping("/api/registrations")
public class RegistrationController {

    @PostMapping
    public ResponseEntity<?> createRegistration(@Valid @RequestBody RegistrationRequestDTO request) {
        // Trả về thông báo thành công test Postman
        return ResponseEntity.status(HttpStatus.CREATED).body(request);
    }
}
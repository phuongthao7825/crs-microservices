package vn.edu.crs.authservice.controller;

import vn.edu.crs.authservice.dto.LoginRequestDTO;
import vn.edu.crs.authservice.dto.LoginResponseDTO;
import vn.edu.crs.authservice.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {
    @Autowired
    private AuthService authService;

    @PostMapping("/login")
    public ResponseEntity<LoginResponseDTO> login(@Valid @RequestBody LoginRequestDTO dto) {
        return ResponseEntity.ok(authService.login(dto));
    }
}
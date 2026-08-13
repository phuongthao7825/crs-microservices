package vn.edu.crs.authservice.service;

import vn.edu.crs.authservice.dto.LoginRequestDTO;
import vn.edu.crs.authservice.dto.LoginResponseDTO;
import vn.edu.crs.authservice.entity.User;
import vn.edu.crs.authservice.exception.InvalidCredentialsException;
import vn.edu.crs.authservice.repository.UserRepository;
import vn.edu.crs.authservice.security.JwtUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private PasswordEncoder passwordEncoder;
    @Autowired
    private JwtUtil jwtUtil;

    public LoginResponseDTO login(LoginRequestDTO dto) {
        User user = userRepository.findByUsername(dto.getUsername())
                .orElseThrow(() -> new InvalidCredentialsException("User khong ton tai"));

        if (!passwordEncoder.matches(dto.getPassword(), user.getPassword())) {
            throw new InvalidCredentialsException("Mat khau khong dung");
        }

        String token = jwtUtil.generateToken(user.getUsername(), user.getRole());
        return new LoginResponseDTO(token, user.getUsername(), user.getRole());
    }
}
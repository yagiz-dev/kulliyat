package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.Staff;
import dev.yagiz.kulliyat.repository.StaffRepository;
import dev.yagiz.kulliyat.service.JwtService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthenticationManager authenticationManager;
    private final JwtService jwtService;
    private final StaffRepository staffRepository;

    public AuthController(AuthenticationManager authenticationManager, JwtService jwtService, StaffRepository staffRepository) {
        this.authenticationManager = authenticationManager;
        this.jwtService = jwtService;
        this.staffRepository = staffRepository;
    }

    // A simple record to accept the JSON payload
    public record LoginRequest(String username, String password) {}

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody LoginRequest request) {
        // Verify the password
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(request.username(), request.password())
        );

        // If we reach here, the password was correct. Fetch the staff record.
        Staff staff = staffRepository.findByUsername(request.username()).orElseThrow();

        // Generate the token
        String token = jwtService.generateToken(staff.getUsername(), staff.getRole());

        return ResponseEntity.ok(token);
    }
}
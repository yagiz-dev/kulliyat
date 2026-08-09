package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.LoginRequest;
import dev.yagiz.kulliyat.dto.ApiDtos.LoginResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.StaffResponse;
import dev.yagiz.kulliyat.entity.Staff;
import dev.yagiz.kulliyat.repository.StaffRepository;
import dev.yagiz.kulliyat.service.JwtService;
import jakarta.validation.Valid;
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

    @PostMapping("/login")
    public LoginResponse login(@Valid @RequestBody LoginRequest request) {
        authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(request.username(), request.password()));
        Staff staff = staffRepository.findByUsername(request.username()).orElseThrow();
        return new LoginResponse(jwtService.generateToken(staff.getUsername(), staff.getRole()), StaffResponse.from(staff));
    }
}

package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.StaffResponse;
import dev.yagiz.kulliyat.repository.StaffRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/staff")
public class StaffController {
    private final StaffRepository staffRepository;
    public StaffController(StaffRepository staffRepository) { this.staffRepository = staffRepository; }

    @GetMapping("/me")
    public StaffResponse currentStaff(Authentication authentication) {
        return staffRepository.findByUsername(authentication.getName()).map(StaffResponse::from)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Yönetici hesabı bulunamadı"));
    }
}

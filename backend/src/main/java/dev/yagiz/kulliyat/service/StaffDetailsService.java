package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.entity.Staff;
import dev.yagiz.kulliyat.repository.StaffRepository;
import org.jspecify.annotations.NonNull;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
public class StaffDetailsService implements UserDetailsService {

    private final StaffRepository staffRepository;

    public StaffDetailsService(StaffRepository staffRepository) {
        this.staffRepository = staffRepository;
    }

    @Override
    public UserDetails loadUserByUsername(@NonNull String username) throws UsernameNotFoundException {
        Staff staff = staffRepository.findByUsername(username)
                .orElseThrow(() -> new UsernameNotFoundException("Yönetici hesabı bulunamadı"));

        // Converts our Staff entity into a Spring Security User object
        return new User(
                staff.getUsername(),
                staff.getPassword(),
                Collections.singletonList(new SimpleGrantedAuthority(staff.getRole()))
        );
    }
}
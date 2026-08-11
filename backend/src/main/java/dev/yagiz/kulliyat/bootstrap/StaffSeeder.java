package dev.yagiz.kulliyat.bootstrap;

import dev.yagiz.kulliyat.entity.Staff;
import dev.yagiz.kulliyat.repository.StaffRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class StaffSeeder implements CommandLineRunner {

    private static final Logger log = LoggerFactory.getLogger(StaffSeeder.class);
    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;
    private final String username;
    private final String password;
    private final String firstName;
    private final String lastName;
    private final String role;

    public StaffSeeder(StaffRepository staffRepository, PasswordEncoder passwordEncoder,
                       @Value("${app.bootstrap-admin.username:}") String username,
                       @Value("${app.bootstrap-admin.password:}") String password,
                       @Value("${app.bootstrap-admin.first-name:}") String firstName,
                       @Value("${app.bootstrap-admin.last-name:}") String lastName,
                       @Value("${app.bootstrap-admin.role:ROLE_ADMIN}") String role) {
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
        this.username = username;
        this.password = password;
        this.firstName = firstName;
        this.lastName = lastName;
        this.role = role;
    }

    @Override
    public void run(String... args) {
        if (username.isBlank() || password.isBlank()) {
            log.info("İlk yönetici hesabı yapılandırılmadığı için oluşturulmadı.");
            return;
        }
        if (staffRepository.findByUsername(username).isEmpty()) {
            Staff admin = new Staff();
            admin.setUsername(username);
            admin.setFirstName(firstName.isBlank() ? null : firstName);
            admin.setLastName(lastName.isBlank() ? null : lastName);
            admin.setPassword(passwordEncoder.encode(password));
            admin.setRole(role);

            staffRepository.save(admin);
            log.info("İlk yönetici hesabı oluşturuldu: {}", username);
        }
    }
}

package dev.yagiz.kulliyat.bootstrap;

import dev.yagiz.kulliyat.entity.Staff;
import dev.yagiz.kulliyat.repository.StaffRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class StaffSeeder implements CommandLineRunner {

    private final StaffRepository staffRepository;
    private final PasswordEncoder passwordEncoder;

    public StaffSeeder(StaffRepository staffRepository, PasswordEncoder passwordEncoder) {
        this.staffRepository = staffRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) throws Exception {
        // Çoktan oluşturulmuş bir admin yoksa ilk admini oluştur
        if (staffRepository.findByUsername("yagizhan").isEmpty()) {
            Staff admin = new Staff();
            admin.setUsername("yagizhan");
            admin.setFirstName("Yağızhan Burak");
            admin.setLastName("Yakar");
            admin.setPassword(passwordEncoder.encode("yagizhan123+"));
            admin.setRole("ROLE_ADMIN");

            staffRepository.save(admin);

            System.out.println("=================================================");
            System.out.println(" İLK ADMIN HESABI OLUŞTURULDU");
            System.out.println(" Kullanıcı adı: yagizhan");
            System.out.println(" Şifre: yagizhan123+");
            System.out.println("=================================================");
        }
    }
}
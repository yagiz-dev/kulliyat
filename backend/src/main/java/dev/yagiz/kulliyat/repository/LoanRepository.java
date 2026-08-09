package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    // Mevcutta ödünç alınmış fiziksel bir kitabın barkodunu okutarak ödünç alma kaydını bul
    Optional<Loan> findByBookCopy_InventoryNumberAndReturnDateIsNull(String inventoryNumber);
}
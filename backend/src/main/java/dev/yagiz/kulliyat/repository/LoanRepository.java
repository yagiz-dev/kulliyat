package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    // Mevcutta ödünç alınmış fiziksel bir kitabın barkodunu okutarak ödünç alma kaydını bul
    Optional<Loan> findByBookCopy_InventoryNumberAndReturnDateIsNull(String inventoryNumber);
    Page<Loan> findByReturnDateIsNull(Pageable pageable);
    Page<Loan> findByReturnDateIsNullAndDueDateBefore(LocalDate date, Pageable pageable);
    long countByReturnDateIsNull();
    long countByReturnDateIsNullAndDueDateBefore(LocalDate date);
    List<Loan> findTop5ByOrderByIdDesc();
}

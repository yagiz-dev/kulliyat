package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LoanRepository extends JpaRepository<Loan, Long> {
}
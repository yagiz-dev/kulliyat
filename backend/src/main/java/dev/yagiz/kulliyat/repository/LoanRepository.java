package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Loan;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;
import java.util.List;
import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface LoanRepository extends JpaRepository<Loan, Long> {

    // Mevcutta ödünç alınmış fiziksel bir kitabın barkodunu okutarak ödünç alma kaydını bul
    Optional<Loan> findByBookCopy_InventoryNumberAndReturnDateIsNull(String inventoryNumber);
    Page<Loan> findByReturnDateIsNull(Pageable pageable);
    Page<Loan> findByReturnDateIsNullAndDueDateBefore(LocalDate date, Pageable pageable);
    long countByReturnDateIsNull();
    long countByReturnDateIsNullAndDueDateBefore(LocalDate date);
    List<Loan> findTop4ByOrderByIdDesc();
    Page<Loan> findByMember_Id(Long memberId, Pageable pageable);
    Page<Loan> findByMember_IdAndReturnDateIsNull(Long memberId, Pageable pageable);
    Page<Loan> findByMember_IdAndReturnDateIsNullAndDueDateBefore(Long memberId, LocalDate date, Pageable pageable);

    @Query("SELECT l.member.id, " +
            "SUM(CASE WHEN l.returnDate IS NULL THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN l.returnDate IS NULL AND l.dueDate < :today THEN 1 ELSE 0 END), COUNT(l) " +
            "FROM Loan l WHERE l.member.id IN :memberIds GROUP BY l.member.id")
    List<Object[]> countOpenLoansByMemberIds(@Param("memberIds") List<Long> memberIds, @Param("today") LocalDate today);
}

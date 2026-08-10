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

    @Query("""
            SELECT l FROM Loan l
            WHERE (:status = 'ALL'
                OR (:status = 'ACTIVE' AND l.returnDate IS NULL)
                OR (:status = 'OVERDUE' AND l.returnDate IS NULL AND l.dueDate < :today))
              AND (:memberId IS NULL OR l.member.id = :memberId)
              AND (:bookId IS NULL OR l.bookCopy.book.id = :bookId)
              AND (:copyId IS NULL OR l.bookCopy.id = :copyId)
              AND (:search = ''
                OR LOWER(l.bookCopy.book.title) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(l.bookCopy.inventoryNumber) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(l.member.firstName) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(l.member.lastName) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(CONCAT(l.member.firstName, ' ', l.member.lastName)) LIKE LOWER(CONCAT('%', :search, '%'))
                OR LOWER(l.member.email) LIKE LOWER(CONCAT('%', :search, '%')))
              AND (:checkoutFrom IS NULL OR l.checkoutDate >= :checkoutFrom)
              AND (:checkoutTo IS NULL OR l.checkoutDate <= :checkoutTo)
              AND (:dueFrom IS NULL OR l.dueDate >= :dueFrom)
              AND (:dueTo IS NULL OR l.dueDate <= :dueTo)
              AND (:issuedBy = '' OR LOWER(l.issuedBy) LIKE LOWER(CONCAT('%', :issuedBy, '%')))
              AND (:overdueRange = '' OR (l.returnDate IS NULL AND l.dueDate < :today
                AND (:overdueFrom IS NULL OR l.dueDate >= :overdueFrom)
                AND (:overdueTo IS NULL OR l.dueDate <= :overdueTo)))
            """)
    Page<Loan> search(@Param("status") String status,
                      @Param("memberId") Long memberId,
                      @Param("bookId") Long bookId,
                      @Param("copyId") Long copyId,
                      @Param("search") String search,
                      @Param("checkoutFrom") LocalDate checkoutFrom,
                      @Param("checkoutTo") LocalDate checkoutTo,
                      @Param("dueFrom") LocalDate dueFrom,
                      @Param("dueTo") LocalDate dueTo,
                      @Param("issuedBy") String issuedBy,
                      @Param("overdueRange") String overdueRange,
                      @Param("overdueFrom") LocalDate overdueFrom,
                      @Param("overdueTo") LocalDate overdueTo,
                      @Param("today") LocalDate today,
                      Pageable pageable);

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

    @Query("SELECT l.bookCopy.book.id, COUNT(l) FROM Loan l WHERE l.returnDate IS NULL AND l.dueDate < :today " +
            "AND l.bookCopy.book.id IN :bookIds GROUP BY l.bookCopy.book.id")
    List<Object[]> countOverdueLoansByBookIds(@Param("bookIds") List<Long> bookIds, @Param("today") LocalDate today);
}

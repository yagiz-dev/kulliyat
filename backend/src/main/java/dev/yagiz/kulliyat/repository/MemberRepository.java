package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.time.LocalDate;
import java.time.LocalDateTime;

public interface MemberRepository extends JpaRepository<Member, Long> {

    boolean existsByEmail(String email);

    boolean existsByPhoneNumber(String phoneNumber);

    @Query("SELECT m FROM Member m WHERE " +
            "LOWER(m.firstName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(m.lastName) LIKE LOWER(CONCAT('%', :searchTerm, '%')) OR " +
            "LOWER(m.email) LIKE LOWER(CONCAT('%', :searchTerm, '%'))")
    Page<Member> searchMembers(@Param("searchTerm") String searchTerm, Pageable pageable);

    @Query(value = "SELECT m FROM Member m WHERE " +
            "(:search IS NULL OR LOWER(m.firstName) LIKE LOWER(CONCAT('%', :search, '%')) OR " +
            "LOWER(m.lastName) LIKE LOWER(CONCAT('%', :search, '%')) OR LOWER(m.email) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:joinedFrom IS NULL OR m.joinedAt >= :joinedFrom) AND " +
            "(:joinedTo IS NULL OR m.joinedAt < :joinedTo) AND " +
            "(:loanState IS NULL OR " +
            "(:loanState = 'ACTIVE' AND EXISTS (SELECT l.id FROM Loan l WHERE l.member = m AND l.returnDate IS NULL AND l.dueDate >= :today)) OR " +
            "(:loanState = 'OVERDUE' AND EXISTS (SELECT l.id FROM Loan l WHERE l.member = m AND l.returnDate IS NULL AND l.dueDate < :today)) OR " +
            "(:loanState = 'NONE' AND NOT EXISTS (SELECT l.id FROM Loan l WHERE l.member = m AND l.returnDate IS NULL)))")
    Page<Member> filter(@Param("search") String search, @Param("joinedFrom") LocalDateTime joinedFrom,
                        @Param("joinedTo") LocalDateTime joinedTo, @Param("loanState") String loanState,
                        @Param("today") LocalDate today, Pageable pageable);
}

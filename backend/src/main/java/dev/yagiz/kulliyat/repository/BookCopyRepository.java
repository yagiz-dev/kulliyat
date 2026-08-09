package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import dev.yagiz.kulliyat.enums.CopyStatus;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface BookCopyRepository extends JpaRepository<BookCopy, Long> {

    Optional<BookCopy> findByInventoryNumber(String inventoryNumber);
    Page<BookCopy> findByInventoryNumberContainingIgnoreCase(String inventoryNumber, Pageable pageable);
    Page<BookCopy> findByStatus(CopyStatus status, Pageable pageable);
    long countByStatus(CopyStatus status);

    @Query("SELECT c.book.id, COUNT(c), " +
            "SUM(CASE WHEN c.status = dev.yagiz.kulliyat.enums.CopyStatus.AVAILABLE THEN 1 ELSE 0 END), " +
            "SUM(CASE WHEN c.status = dev.yagiz.kulliyat.enums.CopyStatus.LOANED THEN 1 ELSE 0 END) " +
            "FROM BookCopy c WHERE c.book.id IN :bookIds GROUP BY c.book.id")
    List<Object[]> summarizeByBookIds(@Param("bookIds") List<Long> bookIds);

    @Query("SELECT c FROM BookCopy c WHERE " +
            "(:search IS NULL OR LOWER(c.inventoryNumber) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:status IS NULL OR c.status = :status) AND " +
            "(:location IS NULL OR LOWER(c.physicalLocation) LIKE LOWER(CONCAT('%', :location, '%'))) AND " +
            "(:bookId IS NULL OR c.book.id = :bookId)")
    Page<BookCopy> filter(@Param("search") String search, @Param("status") CopyStatus status,
                          @Param("location") String location, @Param("bookId") Long bookId, Pageable pageable);

    @Query("SELECT COALESCE(MAX(b.id), 0) FROM BookCopy b")
    Long findMaxId();
}

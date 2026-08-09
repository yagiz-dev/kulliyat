package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import dev.yagiz.kulliyat.enums.CopyStatus;

public interface BookCopyRepository extends JpaRepository<BookCopy, Long> {

    Optional<BookCopy> findByInventoryNumber(String inventoryNumber);
    Page<BookCopy> findByInventoryNumberContainingIgnoreCase(String inventoryNumber, Pageable pageable);
    Page<BookCopy> findByStatus(CopyStatus status, Pageable pageable);
    long countByStatus(CopyStatus status);

    @Query("SELECT COALESCE(MAX(b.id), 0) FROM BookCopy b")
    Long findMaxId();
}

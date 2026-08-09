package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface BookCopyRepository extends JpaRepository<BookCopy, Long> {

    Optional<BookCopy> findByInventoryNumber(String inventoryNumber);

    @Query("SELECT COALESCE(MAX(b.id), 0) FROM BookCopy b")
    Long findMaxId();
}
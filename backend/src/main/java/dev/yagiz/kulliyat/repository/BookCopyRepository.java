package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.BookCopy;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface BookCopyRepository extends JpaRepository<BookCopy, Long> {
    Optional<BookCopy> findByInventoryNumber(String inventoryNumber);
}
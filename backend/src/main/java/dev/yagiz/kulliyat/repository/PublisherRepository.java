package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    Optional<Publisher> findByNameIgnoreCase(String name);
    @Query("SELECT p.id, p.name, COUNT(DISTINCT b.id), COUNT(c.id), " +
            "SUM(CASE WHEN c.status = dev.yagiz.kulliyat.enums.CopyStatus.AVAILABLE THEN 1 ELSE 0 END) " +
            "FROM Publisher p LEFT JOIN p.books b LEFT JOIN b.copies c GROUP BY p.id, p.name")
    List<Object[]> findAllSummaries();
    @Query("SELECT COUNT(b) FROM Publisher p JOIN p.books b WHERE p.id = :id")
    long countBooksById(@Param("id") Long id);
}

package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.List;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

@Repository
public interface AuthorRepository extends JpaRepository<Author, Long> {
    Optional<Author> findByNameIgnoreCase(String name);
    @Query("SELECT a.id, a.name, COUNT(DISTINCT b.id), COUNT(c.id), " +
            "SUM(CASE WHEN c.status = dev.yagiz.kulliyat.enums.CopyStatus.AVAILABLE THEN 1 ELSE 0 END) " +
            "FROM Author a LEFT JOIN a.books b LEFT JOIN b.copies c GROUP BY a.id, a.name")
    List<Object[]> findAllSummaries();
    @Query("SELECT COUNT(b) FROM Author a JOIN a.books b WHERE a.id = :id")
    long countBooksById(@Param("id") Long id);
}

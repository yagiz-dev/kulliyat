package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Book;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import dev.yagiz.kulliyat.enums.Genre;

@Repository
public interface BookRepository extends JpaRepository<Book, Long> {

    Page<Book> findByTitleContainingIgnoreCase(String title, Pageable pageable);

    @Query(value = "SELECT DISTINCT b FROM Book b LEFT JOIN b.authors a WHERE " +
            "(:search IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
            "(:genre IS NULL OR b.genre = :genre) AND " +
            "(:authorId IS NULL OR a.id = :authorId) AND " +
            "(:publisherId IS NULL OR b.publisher.id = :publisherId) AND " +
            "(:yearFrom IS NULL OR b.publicationYear >= :yearFrom) AND " +
            "(:yearTo IS NULL OR b.publicationYear <= :yearTo)",
            countQuery = "SELECT COUNT(DISTINCT b) FROM Book b LEFT JOIN b.authors a WHERE " +
                    "(:search IS NULL OR LOWER(b.title) LIKE LOWER(CONCAT('%', :search, '%'))) AND " +
                    "(:genre IS NULL OR b.genre = :genre) AND " +
                    "(:authorId IS NULL OR a.id = :authorId) AND " +
                    "(:publisherId IS NULL OR b.publisher.id = :publisherId) AND " +
                    "(:yearFrom IS NULL OR b.publicationYear >= :yearFrom) AND " +
                    "(:yearTo IS NULL OR b.publicationYear <= :yearTo)")
    Page<Book> filter(@Param("search") String search, @Param("genre") Genre genre,
                      @Param("authorId") Long authorId, @Param("publisherId") Long publisherId,
                      @Param("yearFrom") Integer yearFrom, @Param("yearTo") Integer yearTo, Pageable pageable);
}

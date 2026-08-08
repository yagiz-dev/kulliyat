package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Author;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AuthorRepository extends JpaRepository {
}
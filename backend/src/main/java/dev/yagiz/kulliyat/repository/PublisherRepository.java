package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Publisher;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface PublisherRepository extends JpaRepository<Publisher, Long> {
    Optional<Publisher> findByNameIgnoreCase(String name);
}

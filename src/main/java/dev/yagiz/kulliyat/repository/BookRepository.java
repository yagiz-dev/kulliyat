package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepository extends JpaRepository {

    // Anladığım kadarıyla JpaString'i extend ettiğimiz için
    // Spring bazı methodları bize hazır veriyor, o yüzden boş method oluşturuyoruz
    List<Book> findByTitleContainingIgnoreCase(String title);
}
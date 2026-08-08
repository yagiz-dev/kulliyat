package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.Author;
import dev.yagiz.kulliyat.entity.Book;
import dev.yagiz.kulliyat.entity.Publisher;
import dev.yagiz.kulliyat.repository.AuthorRepository;
import dev.yagiz.kulliyat.repository.BookRepository;
import dev.yagiz.kulliyat.repository.PublisherRepository;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;

    public BookController(BookRepository bookRepository, AuthorRepository authorRepository, PublisherRepository publisherRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.publisherRepository = publisherRepository;
    }

    @PostMapping
    public Book createBook(@RequestBody Book book) {
        // Yayını bul bul
        if (book.getPublisher() != null && book.getPublisher().getId() != null) {
            Publisher managedPublisher = publisherRepository.findById(book.getPublisher().getId())
                .orElseThrow(() -> new RuntimeException("Yayın bulunamadı"));
            book.setPublisher(managedPublisher);
        }

        // Verilen ID'lerden yazarları bul
        if (book.getAuthors() != null && !book.getAuthors().isEmpty()) {
            List<Author> managedAuthors = new ArrayList<>();
            for (Author author : book.getAuthors()) {
                Author managedAuthor = authorRepository.findById(author.getId())
                    .orElseThrow(() -> new RuntimeException("Geçersiz yazar ID'si belirtildi"));
                managedAuthors.add(managedAuthor);
            }
            book.setAuthors(managedAuthors);
        }

        return bookRepository.save(book);
    }

    @GetMapping
    public Iterable<Book> getAllBooks() {
        return bookRepository.findAll();
    }
}
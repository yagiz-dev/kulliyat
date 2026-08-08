package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.Book;
import dev.yagiz.kulliyat.repository.BookRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
public class BookController {

    private final BookRepository bookRepository;

    public BookController(BookRepository bookRepository) {
        this.bookRepository = bookRepository;
    }

    /**
     * Bu olayı sevdim. Direkt olarak POST body'sini parse ederek
     * parametrelerden entity oluşturabiliyor.
     *
     * Ama bu RequestBody annotation'unu biraz daha incelemem lazım.
     */
    @PostMapping
    public Book createBook(@RequestBody Book book) {
        return (Book) bookRepository.save(book);
    }

    @GetMapping
    public Iterable getAllBooks() {
        return bookRepository.findAll();
    }
}
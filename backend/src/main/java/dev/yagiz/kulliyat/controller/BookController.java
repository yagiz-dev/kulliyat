package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.BookRequest;
import dev.yagiz.kulliyat.dto.ApiDtos.BookResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.PageResponse;
import dev.yagiz.kulliyat.service.BookService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books")
public class BookController {
    private final BookService bookService;

    public BookController(BookService bookService) { this.bookService = bookService; }

    @PostMapping
    public ResponseEntity<BookResponse> createBook(@Valid @RequestBody BookRequest request) {
        return ResponseEntity.ok(BookResponse.from(bookService.createBook(request)));
    }

    @GetMapping
    public ResponseEntity<PageResponse<BookResponse>> getAllBooks(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "title") String sortBy) {
        return ResponseEntity.ok(PageResponse.from(bookService.getBooks(search, page, size, sortBy), BookResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<BookResponse> getBookById(@PathVariable Long id) {
        return ResponseEntity.ok(BookResponse.from(bookService.getBookById(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<BookResponse> updateBook(@PathVariable Long id, @Valid @RequestBody BookRequest request) {
        return ResponseEntity.ok(BookResponse.from(bookService.updateBook(id, request)));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBook(@PathVariable Long id) {
        bookService.deleteBook(id);
        return ResponseEntity.noContent().build();
    }
}

package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.BookCopy;
import dev.yagiz.kulliyat.service.BookCopyService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/books/{bookId}/copies")
public class BookCopyController {

    private final BookCopyService bookCopyService;

    public BookCopyController(BookCopyService bookCopyService) {
        this.bookCopyService = bookCopyService;
    }

    public record AddCopyRequest(String inventoryNumber, String physicalLocation) {}

    @PostMapping
    public ResponseEntity<BookCopy> addCopy(@PathVariable Long bookId, @RequestBody AddCopyRequest request) {
        BookCopy newCopy = bookCopyService.addCopyToBook(bookId, request.inventoryNumber(), request.physicalLocation());
        return ResponseEntity.ok(newCopy);
    }
}
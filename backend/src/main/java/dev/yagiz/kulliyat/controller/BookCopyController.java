package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.AddCopyRequest;
import dev.yagiz.kulliyat.dto.ApiDtos.BookCopyResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.PageResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.UpdateCopyRequest;
import dev.yagiz.kulliyat.enums.CopyStatus;
import dev.yagiz.kulliyat.service.BookCopyService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
public class BookCopyController {
    private final BookCopyService bookCopyService;

    public BookCopyController(BookCopyService bookCopyService) { this.bookCopyService = bookCopyService; }

    @PostMapping("/books/{bookId}/copies")
    public ResponseEntity<BookCopyResponse> addCopy(@PathVariable Long bookId, @RequestBody AddCopyRequest request) {
        return ResponseEntity.ok(BookCopyResponse.from(bookCopyService.addCopyToBook(bookId, request.physicalLocation())));
    }

    @GetMapping("/copies")
    public ResponseEntity<PageResponse<BookCopyResponse>> getCopies(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) CopyStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(PageResponse.from(bookCopyService.getCopies(search, status, page, size), BookCopyResponse::from));
    }

    @GetMapping("/copies/{id}")
    public ResponseEntity<BookCopyResponse> getCopy(@PathVariable Long id) {
        return ResponseEntity.ok(BookCopyResponse.from(bookCopyService.getCopy(id)));
    }

    @PatchMapping("/copies/{id}")
    public ResponseEntity<BookCopyResponse> updateCopy(@PathVariable Long id, @Valid @RequestBody UpdateCopyRequest request) {
        return ResponseEntity.ok(BookCopyResponse.from(bookCopyService.updateCopy(id, request)));
    }
}

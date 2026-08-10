package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.dto.ApiDtos.UpdateCopyRequest;
import dev.yagiz.kulliyat.entity.Book;
import dev.yagiz.kulliyat.entity.BookCopy;
import dev.yagiz.kulliyat.enums.CopyStatus;
import dev.yagiz.kulliyat.repository.BookCopyRepository;
import dev.yagiz.kulliyat.repository.BookRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class BookCopyService {
    private final BookCopyRepository bookCopyRepository;
    private final BookRepository bookRepository;

    public BookCopyService(BookCopyRepository bookCopyRepository, BookRepository bookRepository) {
        this.bookCopyRepository = bookCopyRepository;
        this.bookRepository = bookRepository;
    }

    public BookCopy addCopyToBook(Long bookId, String physicalLocation, String notes) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
        Long nextId = bookCopyRepository.findMaxId() + 1;
        BookCopy copy = new BookCopy();
        copy.setInventoryNumber(String.format("TOFAS-KTP-%05d", nextId));
        copy.setPhysicalLocation(physicalLocation);
        copy.setNotes(normalizeNotes(notes));
        copy.setStatus(CopyStatus.AVAILABLE);
        copy.setBook(book);
        return bookCopyRepository.save(copy);
    }

    public Page<BookCopy> getCopies(String search, CopyStatus status, String location, Long bookId, int page, int size,
                                    String sortBy, String sortDirection) {
        String property = switch (sortBy) {
            case "book.title", "status", "physicalLocation" -> sortBy;
            default -> "inventoryNumber";
        };
        Sort.Direction direction = "desc".equalsIgnoreCase(sortDirection) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, property));
        return bookCopyRepository.filter(normalize(search), status, normalize(location), bookId, pageable);
    }

    private String normalize(String value) { return value == null || value.isBlank() ? null : value.trim(); }

    public BookCopy getCopy(Long id) {
        return bookCopyRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitap nüshası bulunamadı"));
    }

    public BookCopy updateCopy(Long id, UpdateCopyRequest request) {
        BookCopy copy = getCopy(id);
        if (request.physicalLocation() != null) copy.setPhysicalLocation(request.physicalLocation());
        if (request.notes() != null) copy.setNotes(normalizeNotes(request.notes()));
        if (request.status() != null) {
            if (copy.getStatus() == CopyStatus.LOANED && request.status() != CopyStatus.LOANED) {
                throw new ResponseStatusException(HttpStatus.CONFLICT, "Ödünç verilmiş bir kitabın durumunu buradan güncelleyemezsiniz. Lütfen iade al menüsünü kullanınız.");
            }
            copy.setStatus(request.status());
        }
        return bookCopyRepository.save(copy);
    }

    private String normalizeNotes(String notes) {
        return notes == null || notes.isBlank() ? null : notes.trim();
    }
}

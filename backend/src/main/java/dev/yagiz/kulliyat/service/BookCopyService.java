package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.entity.Book;
import dev.yagiz.kulliyat.entity.BookCopy;
import dev.yagiz.kulliyat.enums.CopyStatus;
import dev.yagiz.kulliyat.repository.BookCopyRepository;
import dev.yagiz.kulliyat.repository.BookRepository;
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

    public BookCopy addCopyToBook(Long bookId, String inventoryNumber, String physicalLocation) {
        // Ensure the parent catalog book actually exists
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitaplıkta belirtilen kitap bulunamadı"));

        // Ensure the barcode isn't already stuck to another book
        if (bookCopyRepository.existsByInventoryNumber(inventoryNumber)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu envanter barkodu zaten başka bir kitapta kullanımda.");
        }

        // Create the physical copy
        BookCopy copy = new BookCopy();
        copy.setInventoryNumber(inventoryNumber);
        copy.setPhysicalLocation(physicalLocation);
        copy.setStatus(CopyStatus.AVAILABLE);

        // Link it to the parent catalog entry
        copy.setBook(book);

        return bookCopyRepository.save(copy);
    }
}
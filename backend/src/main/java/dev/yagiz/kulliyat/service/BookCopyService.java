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

    public BookCopy addCopyToBook(Long bookId, String physicalLocation) {
        Book book = bookRepository.findById(bookId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Belirtilen kitap kütüphanede bulunamadı"));

        // Calculate the next inventory number
        Long nextId = bookCopyRepository.findMaxId() + 1;
        String generatedBarcode = String.format("TOFAS-KTP-%05d", nextId);

        // Create the physical copy
        BookCopy copy = new BookCopy();
        copy.setInventoryNumber(generatedBarcode);
        copy.setPhysicalLocation(physicalLocation);
        copy.setStatus(CopyStatus.AVAILABLE);
        copy.setBook(book);

        return bookCopyRepository.save(copy);
    }
}
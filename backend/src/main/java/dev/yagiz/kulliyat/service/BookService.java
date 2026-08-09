package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.dto.ApiDtos.BookRequest;
import dev.yagiz.kulliyat.entity.Author;
import dev.yagiz.kulliyat.entity.Book;
import dev.yagiz.kulliyat.entity.Publisher;
import dev.yagiz.kulliyat.repository.AuthorRepository;
import dev.yagiz.kulliyat.repository.BookRepository;
import dev.yagiz.kulliyat.repository.PublisherRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;

@Service
public class BookService {
    private final BookRepository bookRepository;
    private final AuthorRepository authorRepository;
    private final PublisherRepository publisherRepository;

    public BookService(BookRepository bookRepository, AuthorRepository authorRepository, PublisherRepository publisherRepository) {
        this.bookRepository = bookRepository;
        this.authorRepository = authorRepository;
        this.publisherRepository = publisherRepository;
    }

    public Book createBook(BookRequest request) {
        Book book = new Book();
        applyRequest(book, request);
        return bookRepository.save(book);
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Book not found"));
    }

    public Page<Book> getBooks(String search, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return search != null && !search.isBlank()
                ? bookRepository.findByTitleContainingIgnoreCase(search, pageable)
                : bookRepository.findAll(pageable);
    }

    public Book updateBook(Long id, BookRequest request) {
        Book book = getBookById(id);
        applyRequest(book, request);
        return bookRepository.save(book);
    }

    public void deleteBook(Long id) {
        if (!bookRepository.existsById(id)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitap bulunamadı");
        }
        bookRepository.deleteById(id);
    }

    private void applyRequest(Book book, BookRequest request) {
        book.setTitle(request.title());
        book.setIsbn(request.isbn());
        book.setPublicationYear(request.publicationYear());
        book.setSummary(request.summary());
        book.setGenre(request.genre());
        book.setCoverImageUrl(request.coverImageUrl());

        Publisher publisher = request.publisherId() == null ? null : publisherRepository.findById(request.publisherId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Yayınevi bulunamadı"));
        book.setPublisher(publisher);

        List<Author> authors = new ArrayList<>();
        for (Long authorId : request.authorIds() == null ? List.<Long>of() : request.authorIds()) {
            authors.add(authorRepository.findById(authorId)
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Yazar bulunamadı")));
        }
        book.setAuthors(authors);
    }
}

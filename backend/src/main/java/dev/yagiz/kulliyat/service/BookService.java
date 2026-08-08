package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.entity.Author;
import dev.yagiz.kulliyat.entity.Book;
import dev.yagiz.kulliyat.entity.Publisher;
import dev.yagiz.kulliyat.repository.AuthorRepository;
import dev.yagiz.kulliyat.repository.BookRepository;
import dev.yagiz.kulliyat.repository.PublisherRepository;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

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

    public Book createBook(Book book) {
        // Yayınevini bul
        if (book.getPublisher() != null && book.getPublisher().getId() != null) {
            Publisher managedPublisher = publisherRepository.findById(book.getPublisher().getId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Yayınevi bulunamadı"));
            book.setPublisher(managedPublisher);
        }

        // Yazarları bul
        if (book.getAuthors() != null && !book.getAuthors().isEmpty()) {
            List<Author> managedAuthors = new ArrayList<>();
            for (Author author : book.getAuthors()) {
                Author managedAuthor = authorRepository.findById(author.getId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Yazar bulunamadı"));
                managedAuthors.add(managedAuthor);
            }
            book.setAuthors(managedAuthors);
        }

        return bookRepository.save(book);
    }

    public Book getBookById(Long id) {
        return bookRepository.findById(id)
            .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitap bulunamadı"));
    }

    public Iterable<Book> getAllBooks() {
        return bookRepository.findAll();
    }

    public Book updateBook(Long id, Book updatedBook) {
        Optional<Book> existingBookOptional = bookRepository.findById(id);

        if (existingBookOptional.isPresent()) {
            Book existingBook = existingBookOptional.get();
            existingBook.setTitle(updatedBook.getTitle());

            if (updatedBook.getPublisher() != null) {
                existingBook.setPublisher(updatedBook.getPublisher());
            }
            if (updatedBook.getAuthors() != null) {
                existingBook.setAuthors(updatedBook.getAuthors());
            }

            return bookRepository.save(existingBook);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitap bulunamadı");
        }
    }

    public void deleteBook(Long id) {
        if (bookRepository.existsById(id)) {
            bookRepository.deleteById(id);
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Kitap bulunuamadı");
        }
    }
}
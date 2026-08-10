package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.AuthorResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.NameRequest;
import dev.yagiz.kulliyat.entity.Author;
import dev.yagiz.kulliyat.repository.AuthorRepository;
import dev.yagiz.kulliyat.repository.BookRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.ArrayList;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {
    private final AuthorRepository repository;
    private final BookRepository bookRepository;
    public AuthorController(AuthorRepository repository, BookRepository bookRepository) { this.repository = repository; this.bookRepository = bookRepository; }

    @PostMapping
    public AuthorResponse create(@Valid @RequestBody NameRequest request) {
        String name = normalize(request.name());
        repository.findByNameIgnoreCase(name).ifPresent(author -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu yazar zaten kayıtlı");
        });
        Author author = new Author(); author.setName(name);
        return AuthorResponse.from(repository.save(author));
    }

    @GetMapping
    public List<AuthorResponse> list() { return repository.findAllSummaries().stream().map(this::summary).toList(); }

    @GetMapping("/{id}")
    public AuthorResponse get(@PathVariable Long id) { return AuthorResponse.from(find(id)); }

    @PutMapping("/{id}")
    public AuthorResponse update(@PathVariable Long id, @Valid @RequestBody NameRequest request) {
        Author author = find(id);
        String name = normalize(request.name());
        repository.findByNameIgnoreCase(name)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu yazar zaten kayıtlı");
                });
        author.setName(name);
        return AuthorResponse.from(repository.save(author));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.countBooksById(id) > 0) throw new ResponseStatusException(HttpStatus.CONFLICT, "Kitaplarla ilişkili bir yazar silinemez; önce birleştirme işlemini kullanın");
        repository.delete(find(id)); return ResponseEntity.noContent().build();
    }

    @PostMapping("/{sourceId}/merge/{targetId}")
    @Transactional
    public ResponseEntity<Void> merge(@PathVariable Long sourceId, @PathVariable Long targetId) {
        if (sourceId.equals(targetId)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bir kayıt kendisiyle birleştirilemez");
        Author source = find(sourceId); Author target = find(targetId);
        for (var book : new ArrayList<>(source.getBooks())) {
            if (!book.getAuthors().contains(target)) book.addAuthor(target);
            book.removeAuthor(source);
        }
        bookRepository.saveAll(target.getBooks());
        repository.delete(source);
        return ResponseEntity.noContent().build();
    }

    private Author find(Long id) { return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Author not found")); }
    private String normalize(String value) { return value.trim().replaceAll("\\s+", " "); }
    private AuthorResponse summary(Object[] row) { return AuthorResponse.summary((Long) row[0], (String) row[1], ((Number) row[2]).longValue(), ((Number) row[3]).longValue(), ((Number) row[4]).longValue()); }
}

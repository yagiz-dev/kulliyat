package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.AuthorResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.NameRequest;
import dev.yagiz.kulliyat.entity.Author;
import dev.yagiz.kulliyat.repository.AuthorRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {
    private final AuthorRepository repository;
    public AuthorController(AuthorRepository repository) { this.repository = repository; }

    @PostMapping
    public AuthorResponse create(@Valid @RequestBody NameRequest request) {
        String name = request.name().trim();
        repository.findByNameIgnoreCase(name).ifPresent(author -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu yazar zaten kayıtlı");
        });
        Author author = new Author(); author.setName(name);
        return AuthorResponse.from(repository.save(author));
    }

    @GetMapping
    public List<AuthorResponse> list() { return repository.findAll().stream().map(AuthorResponse::from).toList(); }

    @GetMapping("/{id}")
    public AuthorResponse get(@PathVariable Long id) { return AuthorResponse.from(find(id)); }

    @PutMapping("/{id}")
    public AuthorResponse update(@PathVariable Long id, @Valid @RequestBody NameRequest request) {
        Author author = find(id);
        String name = request.name().trim();
        repository.findByNameIgnoreCase(name)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu yazar zaten kayıtlı");
                });
        author.setName(name);
        return AuthorResponse.from(repository.save(author));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { repository.delete(find(id)); return ResponseEntity.noContent().build(); }

    private Author find(Long id) { return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Author not found")); }
}

package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.NameRequest;
import dev.yagiz.kulliyat.dto.ApiDtos.PublisherResponse;
import dev.yagiz.kulliyat.entity.Publisher;
import dev.yagiz.kulliyat.repository.PublisherRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping("/api/publishers")
public class PublisherController {
    private final PublisherRepository repository;
    public PublisherController(PublisherRepository repository) { this.repository = repository; }

    @PostMapping
    public PublisherResponse create(@Valid @RequestBody NameRequest request) {
        String name = request.name().trim();
        repository.findByNameIgnoreCase(name).ifPresent(publisher -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu yayınevi zaten kayıtlı");
        });
        Publisher publisher = new Publisher(); publisher.setName(name);
        return PublisherResponse.from(repository.save(publisher));
    }

    @GetMapping
    public List<PublisherResponse> list() { return repository.findAll().stream().map(PublisherResponse::from).toList(); }

    @GetMapping("/{id}")
    public PublisherResponse get(@PathVariable Long id) { return PublisherResponse.from(find(id)); }

    @PutMapping("/{id}")
    public PublisherResponse update(@PathVariable Long id, @Valid @RequestBody NameRequest request) {
        Publisher publisher = find(id);
        String name = request.name().trim();
        repository.findByNameIgnoreCase(name)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu yayınevi zaten kayıtlı");
                });
        publisher.setName(name);
        return PublisherResponse.from(repository.save(publisher));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) { repository.delete(find(id)); return ResponseEntity.noContent().build(); }

    private Publisher find(Long id) { return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Publisher not found")); }
}

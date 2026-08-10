package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.NameRequest;
import dev.yagiz.kulliyat.dto.ApiDtos.PublisherResponse;
import dev.yagiz.kulliyat.entity.Publisher;
import dev.yagiz.kulliyat.repository.PublisherRepository;
import dev.yagiz.kulliyat.repository.BookRepository;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import org.springframework.transaction.annotation.Transactional;

@RestController
@RequestMapping("/api/publishers")
public class PublisherController {
    private final PublisherRepository repository;
    private final BookRepository bookRepository;
    public PublisherController(PublisherRepository repository, BookRepository bookRepository) { this.repository = repository; this.bookRepository = bookRepository; }

    @PostMapping
    public PublisherResponse create(@Valid @RequestBody NameRequest request) {
        String name = normalize(request.name());
        repository.findByNameIgnoreCase(name).ifPresent(publisher -> {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu yayınevi zaten kayıtlı");
        });
        Publisher publisher = new Publisher(); publisher.setName(name);
        return PublisherResponse.from(repository.save(publisher));
    }

    @GetMapping
    public List<PublisherResponse> list() { return repository.findAllSummaries().stream().map(this::summary).toList(); }

    @GetMapping("/{id}")
    public PublisherResponse get(@PathVariable Long id) { return PublisherResponse.from(find(id)); }

    @PutMapping("/{id}")
    public PublisherResponse update(@PathVariable Long id, @Valid @RequestBody NameRequest request) {
        Publisher publisher = find(id);
        String name = normalize(request.name());
        repository.findByNameIgnoreCase(name)
                .filter(existing -> !existing.getId().equals(id))
                .ifPresent(existing -> {
                    throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu yayınevi zaten kayıtlı");
                });
        publisher.setName(name);
        return PublisherResponse.from(repository.save(publisher));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        if (repository.countBooksById(id) > 0) throw new ResponseStatusException(HttpStatus.CONFLICT, "Kitaplarla ilişkili bir yayınevi silinemez; önce birleştirme işlemini kullanın");
        repository.delete(find(id)); return ResponseEntity.noContent().build();
    }

    @PostMapping("/{sourceId}/merge/{targetId}")
    @Transactional
    public ResponseEntity<Void> merge(@PathVariable Long sourceId, @PathVariable Long targetId) {
        if (sourceId.equals(targetId)) throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bir kayıt kendisiyle birleştirilemez");
        Publisher source = find(sourceId); Publisher target = find(targetId);
        bookRepository.reassignPublisher(source, target);
        repository.deleteById(sourceId);
        return ResponseEntity.noContent().build();
    }

    private Publisher find(Long id) { return repository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Publisher not found")); }
    private String normalize(String value) { return value.trim().replaceAll("\\s+", " "); }
    private PublisherResponse summary(Object[] row) { return PublisherResponse.summary((Long) row[0], (String) row[1], ((Number) row[2]).longValue(), ((Number) row[3]).longValue(), ((Number) row[4]).longValue()); }
}

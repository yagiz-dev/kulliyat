package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.Author;
import dev.yagiz.kulliyat.repository.AuthorRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/authors")
public class AuthorController {

    private final AuthorRepository authorRepository;

    public AuthorController(AuthorRepository authorRepository) {
        this.authorRepository = authorRepository;
    }

    /**
     * Bu olayı sevdim. Direkt olarak POST body'sini parse ederek
     * parametrelerden entity oluşturabiliyor.
     *
     * Ama bu RequestBody annotation'unu biraz daha incelemem lazım.
     */
    @PostMapping
    public Author createAuthor(@RequestBody Author author) {
        return (Author) authorRepository.save(author);
    }

    @GetMapping
    public Iterable getAllAuthors() {
        return authorRepository.findAll();
    }
}
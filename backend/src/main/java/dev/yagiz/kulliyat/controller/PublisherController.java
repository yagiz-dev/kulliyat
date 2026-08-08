package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.Publisher;
import dev.yagiz.kulliyat.repository.PublisherRepository;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/publishers")
public class PublisherController {

    private final PublisherRepository publisherRepository;

    public PublisherController(PublisherRepository publisherRepository) {
        this.publisherRepository = publisherRepository;
    }

    /**
     * Bu olayı sevdim. Direkt olarak POST body'sini parse ederek
     * parametrelerden entity oluşturabiliyor.
     *
     * Ama bu RequestBody annotation'unu biraz daha incelemem lazım.
     */
    @PostMapping
    public Publisher createPublisher(@RequestBody Publisher publisher) {
        return (Publisher) publisherRepository.save(publisher);
    }

    @GetMapping
    public Iterable getAllPublishers() {
        return publisherRepository.findAll();
    }
}
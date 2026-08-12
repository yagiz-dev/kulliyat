package dev.yagiz.kulliyat.entity;

import dev.yagiz.kulliyat.enums.CopyStatus;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "book_copies")
@Getter
@Setter
public class BookCopy {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // örn. "TOFAS-KTP-00060". Kitabın arkasındaki takip barkodu
    @Column(unique = true, nullable = false)
    private String inventoryNumber;

    // örn. "2. kat, Tarih bölümü, 4. raf"
    private String physicalLocation;

    @Column(columnDefinition = "TEXT")
    private String notes;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private CopyStatus status = CopyStatus.AVAILABLE;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "book_id", nullable = false)
    private Book book;

}

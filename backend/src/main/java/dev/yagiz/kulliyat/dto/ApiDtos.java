package dev.yagiz.kulliyat.dto;

import dev.yagiz.kulliyat.entity.Author;
import dev.yagiz.kulliyat.entity.Book;
import dev.yagiz.kulliyat.entity.BookCopy;
import dev.yagiz.kulliyat.entity.Loan;
import dev.yagiz.kulliyat.entity.Member;
import dev.yagiz.kulliyat.entity.Publisher;
import dev.yagiz.kulliyat.entity.Staff;
import dev.yagiz.kulliyat.enums.CopyStatus;
import dev.yagiz.kulliyat.enums.Genre;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import org.springframework.data.domain.Page;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.function.Function;

public final class ApiDtos {
    private ApiDtos() {}

    public record PageResponse<T>(List<T> content, long totalElements, int totalPages, int number, int size) {
        public static <S, T> PageResponse<T> from(Page<S> page, Function<S, T> mapper) {
            return new PageResponse<>(page.getContent().stream().map(mapper).toList(), page.getTotalElements(),
                    page.getTotalPages(), page.getNumber(), page.getSize());
        }
    }

    public record AuthorResponse(Long id, String name, long bookCount, long totalCopyCount, long availableCopyCount) {
        public static AuthorResponse from(Author author) { return new AuthorResponse(author.getId(), author.getName(), 0, 0, 0); }
        public static AuthorResponse summary(Long id, String name, long bookCount, long totalCopyCount, long availableCopyCount) {
            return new AuthorResponse(id, name, bookCount, totalCopyCount, availableCopyCount);
        }
    }

    public record PublisherResponse(Long id, String name, long bookCount, long totalCopyCount, long availableCopyCount) {
        public static PublisherResponse from(Publisher publisher) { return new PublisherResponse(publisher.getId(), publisher.getName(), 0, 0, 0); }
        public static PublisherResponse summary(Long id, String name, long bookCount, long totalCopyCount, long availableCopyCount) {
            return new PublisherResponse(id, name, bookCount, totalCopyCount, availableCopyCount);
        }
    }

    public record BookSummary(Long id, String title, String isbn, String coverImageUrl) {
        public static BookSummary from(Book book) {
            return new BookSummary(book.getId(), book.getTitle(), book.getIsbn(), book.getCoverImageUrl());
        }
    }

    public record BookResponse(Long id, String title, String isbn, Integer publicationYear, String summary, Genre genre,
                               String coverImageUrl, LocalDateTime createdAt, LocalDateTime updatedAt,
                                 PublisherResponse publisher, List<AuthorResponse> authors,
                                 long totalCopyCount, long availableCopyCount, long loanedCopyCount, long overdueCopyCount) {
        public static BookResponse from(Book book) {
            return new BookResponse(book.getId(), book.getTitle(), book.getIsbn(), book.getPublicationYear(),
                    book.getSummary(), book.getGenre(), book.getCoverImageUrl(), book.getCreatedAt(), book.getUpdatedAt(),
                    book.getPublisher() == null ? null : PublisherResponse.from(book.getPublisher()),
                      book.getAuthors().stream().map(AuthorResponse::from).toList(), 0, 0, 0, 0);
          }
          public static BookResponse from(Book book, long totalCopyCount, long availableCopyCount,
                                          long loanedCopyCount, long overdueCopyCount) {
              return new BookResponse(book.getId(), book.getTitle(), book.getIsbn(), book.getPublicationYear(),
                      book.getSummary(), book.getGenre(), book.getCoverImageUrl(), book.getCreatedAt(), book.getUpdatedAt(),
                      book.getPublisher() == null ? null : PublisherResponse.from(book.getPublisher()),
                      book.getAuthors().stream().map(AuthorResponse::from).toList(), totalCopyCount,
                      availableCopyCount, loanedCopyCount, overdueCopyCount);
        }
    }

    public record BookCopyResponse(Long id, String inventoryNumber, String physicalLocation, CopyStatus status,
                                   BookSummary book) {
        public static BookCopyResponse from(BookCopy copy) {
            return new BookCopyResponse(copy.getId(), copy.getInventoryNumber(), copy.getPhysicalLocation(),
                    copy.getStatus(), BookSummary.from(copy.getBook()));
        }
    }

    public record MemberResponse(Long id, String firstName, String lastName, String email, String phoneNumber,
                                 LocalDateTime joinedAt, long activeLoanCount, long overdueLoanCount, long totalLoanCount) {
        public static MemberResponse from(Member member) {
            return new MemberResponse(member.getId(), member.getFirstName(), member.getLastName(), member.getEmail(),
                    member.getPhoneNumber(), member.getJoinedAt(), 0, 0, 0);
        }
        public static MemberResponse from(Member member, long activeLoanCount, long overdueLoanCount, long totalLoanCount) {
            return new MemberResponse(member.getId(), member.getFirstName(), member.getLastName(), member.getEmail(),
                    member.getPhoneNumber(), member.getJoinedAt(), activeLoanCount, overdueLoanCount, totalLoanCount);
        }
    }

    public record LoanResponse(Long id, BookCopyResponse bookCopy, MemberResponse member, LocalDate checkoutDate,
                               LocalDate dueDate, LocalDate returnDate, String issuedBy, boolean overdue) {
        public static LoanResponse from(Loan loan) {
            boolean overdue = loan.getReturnDate() == null && loan.getDueDate().isBefore(LocalDate.now());
            return new LoanResponse(loan.getId(), BookCopyResponse.from(loan.getBookCopy()),
                    MemberResponse.from(loan.getMember()), loan.getCheckoutDate(), loan.getDueDate(),
                    loan.getReturnDate(), loan.getIssuedBy(), overdue);
        }
    }

    public record DashboardSummaryResponse(long totalBooks, long totalCopies, long availableCopies,
                                           long loanedCopies, long maintenanceCopies, long lostCopies,
                                           long totalMembers, long activeLoans, long overdueLoans,
                                           List<LoanResponse> recentLoans) {}

    public record StaffResponse(Long id, String username, String firstName, String lastName, String role) {
        public static StaffResponse from(Staff staff) {
            return new StaffResponse(staff.getId(), staff.getUsername(), staff.getFirstName(), staff.getLastName(), staff.getRole());
        }
    }

    public record LoginRequest(@NotBlank String username, @NotBlank String password) {}
    public record LoginResponse(String token, StaffResponse staff) {}
    public record NameRequest(@NotBlank @Size(max = 255) String name) {}
    public record BookRequest(@NotBlank String title, @NotBlank String isbn, Integer publicationYear, String summary,
                              @NotNull Genre genre, String coverImageUrl, Long publisherId, List<Long> authorIds) {}
    public record MemberRequest(@NotBlank String firstName, @NotBlank String lastName, @NotBlank @Email String email,
                                String phoneNumber) {}
    public record AddCopyRequest(String physicalLocation) {}
    public record UpdateCopyRequest(String physicalLocation, CopyStatus status) {}
    public record CopyLabelRequest(@NotEmpty @Size(max = 500) List<@NotNull Long> copyIds,
                                   @Min(1) @Max(20) Integer startPosition) {}
    public record CheckoutRequest(@NotNull Long memberId, @NotBlank String inventoryNumber) {}
    public record ReturnRequest(@NotBlank String inventoryNumber) {}
}

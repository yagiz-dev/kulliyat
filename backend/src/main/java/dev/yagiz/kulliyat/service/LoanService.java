package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.entity.BookCopy;
import dev.yagiz.kulliyat.entity.Loan;
import dev.yagiz.kulliyat.entity.Member;
import dev.yagiz.kulliyat.enums.CopyStatus;
import dev.yagiz.kulliyat.repository.BookCopyRepository;
import dev.yagiz.kulliyat.repository.LoanRepository;
import dev.yagiz.kulliyat.repository.MemberRepository;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import java.time.LocalDate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;

@Service
public class LoanService {
    public enum LoanStatus { ALL, ACTIVE, OVERDUE }

    private final LoanRepository loanRepository;
    private final BookCopyRepository bookCopyRepository;
    private final MemberRepository memberRepository;

    public LoanService(LoanRepository loanRepository, BookCopyRepository bookCopyRepository, MemberRepository memberRepository) {
        this.loanRepository = loanRepository;
        this.bookCopyRepository = bookCopyRepository;
        this.memberRepository = memberRepository;
    }

    // @Transactional kullanarak iki query'nin aynı anda çalışmasını,
    // birinde hata olursa diğerinin de geri alınmasını sağlıyoruz.
    @Transactional
    public Loan checkoutBook(Long memberId, String inventoryNumber) {
        // Find the member
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ziyaretçi bulunamadı"));

        // Find the specific physical copy by its barcode/inventory number
        BookCopy copy = bookCopyRepository.findByInventoryNumber(inventoryNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Fiziksel kitap kaydı bulunamadı"));

        // Is it actually on the shelf and available to loan?
        if (copy.getStatus() != CopyStatus.AVAILABLE) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bu kitap şu anda " + copy.getStatus() + " olarak işaretlendiğinden ödünç alınamaz.");
        }

        // Update the physical copy's status
        copy.setStatus(CopyStatus.LOANED);
        bookCopyRepository.save(copy);

        // Get the username of the currently logged-in Admin from the JWT
        String issuedBy = SecurityContextHolder.getContext().getAuthentication().getName();

        // Create the loan record
        Loan loan = new Loan();
        loan.setMember(member);
        loan.setBookCopy(copy);
        loan.setCheckoutDate(LocalDate.now());
        loan.setDueDate(LocalDate.now().plusDays(14)); // Standard 2-week checkout period
        loan.setIssuedBy(issuedBy);
        // returnDate is intentionally left null!

        return loanRepository.save(loan);
    }

    @Transactional
    public Loan returnBook(String inventoryNumber) {
        // Find the active loan for this specific physical copy
        Loan activeLoan = loanRepository.findByBookCopy_InventoryNumberAndReturnDateIsNull(inventoryNumber)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Bu kitap şu anda ödünç alınmış gözükmüyor."));

        // Mark the return date as today
        activeLoan.setReturnDate(LocalDate.now());

        // Update the physical copy's status back to AVAILABLE
        BookCopy copy = activeLoan.getBookCopy();
        copy.setStatus(CopyStatus.AVAILABLE);
        bookCopyRepository.save(copy);

        // Save and return the updated loan record
        return loanRepository.save(activeLoan);
    }

    public Page<Loan> getLoans(LoanStatus status, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(Sort.Direction.DESC, "checkoutDate"));
        return switch (status == null ? LoanStatus.ALL : status) {
            case ACTIVE -> loanRepository.findByReturnDateIsNull(pageable);
            case OVERDUE -> loanRepository.findByReturnDateIsNullAndDueDateBefore(LocalDate.now(), pageable);
            case ALL -> loanRepository.findAll(pageable);
        };
    }
}

package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.dto.ApiDtos.DashboardSummaryResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.LoanResponse;
import dev.yagiz.kulliyat.enums.CopyStatus;
import dev.yagiz.kulliyat.repository.BookCopyRepository;
import dev.yagiz.kulliyat.repository.BookRepository;
import dev.yagiz.kulliyat.repository.LoanRepository;
import dev.yagiz.kulliyat.repository.MemberRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;

@Service
public class DashboardService {
    private final BookRepository bookRepository;
    private final BookCopyRepository copyRepository;
    private final MemberRepository memberRepository;
    private final LoanRepository loanRepository;

    public DashboardService(BookRepository bookRepository, BookCopyRepository copyRepository, MemberRepository memberRepository, LoanRepository loanRepository) {
        this.bookRepository = bookRepository;
        this.copyRepository = copyRepository;
        this.memberRepository = memberRepository;
        this.loanRepository = loanRepository;
    }

    @Transactional(readOnly = true)
    public DashboardSummaryResponse getSummary() {
        return new DashboardSummaryResponse(
                bookRepository.count(),
                copyRepository.count(),
                copyRepository.countByStatus(CopyStatus.AVAILABLE),
                copyRepository.countByStatus(CopyStatus.LOANED),
                copyRepository.countByStatus(CopyStatus.MAINTENANCE),
                copyRepository.countByStatus(CopyStatus.LOST),
                memberRepository.count(),
                loanRepository.countByReturnDateIsNull(),
                loanRepository.countByReturnDateIsNullAndDueDateBefore(LocalDate.now()),
                loanRepository.findTop4ByOrderByIdDesc().stream().map(LoanResponse::from).toList()
        );
    }
}

package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.CheckoutRequest;
import dev.yagiz.kulliyat.dto.ApiDtos.LoanResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.PageResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.ReturnRequest;
import dev.yagiz.kulliyat.service.LoanService;
import dev.yagiz.kulliyat.service.LoanService.LoanStatus;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;

@RestController
@RequestMapping("/api/loans")
public class LoanController {
    private final LoanService loanService;

    public LoanController(LoanService loanService) { this.loanService = loanService; }

    @GetMapping
    public ResponseEntity<PageResponse<LoanResponse>> getLoans(
            @RequestParam(defaultValue = "ALL") LoanStatus status,
            @RequestParam(required = false) Long memberId,
            @RequestParam(required = false) Long bookId,
            @RequestParam(required = false) Long copyId,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(required = false) LocalDate checkoutFrom,
            @RequestParam(required = false) LocalDate checkoutTo,
            @RequestParam(required = false) LocalDate dueFrom,
            @RequestParam(required = false) LocalDate dueTo,
            @RequestParam(defaultValue = "") String issuedBy,
            @RequestParam(defaultValue = "") String overdueRange,
            @RequestParam(defaultValue = "checkoutDate") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDirection,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(PageResponse.from(loanService.getLoans(status, memberId, bookId, copyId, search, checkoutFrom,
                checkoutTo, dueFrom, dueTo, issuedBy, overdueRange, sortBy, sortDirection, page, size), LoanResponse::from));
    }

    @PostMapping("/checkout")
    public ResponseEntity<LoanResponse> checkout(@Valid @RequestBody CheckoutRequest request) {
        return ResponseEntity.ok(LoanResponse.from(loanService.checkoutBook(request.memberId(), request.inventoryNumber())));
    }

    @PostMapping("/return")
    public ResponseEntity<LoanResponse> returnBook(@Valid @RequestBody ReturnRequest request) {
        return ResponseEntity.ok(LoanResponse.from(loanService.returnBook(request.inventoryNumber())));
    }
}

package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.Loan;
import dev.yagiz.kulliyat.service.LoanService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/loans")
public class LoanController {

    private final LoanService loanService;

    public LoanController(LoanService loanService) {
        this.loanService = loanService;
    }

    public record CheckoutRequest(Long memberId, String inventoryNumber) {}
    public record ReturnRequest(String inventoryNumber) {}

    @PostMapping("/checkout")
    public ResponseEntity<Loan> checkout(@RequestBody CheckoutRequest request) {
        Loan loan = loanService.checkoutBook(request.memberId(), request.inventoryNumber());
        return ResponseEntity.ok(loan);
    }

    @PostMapping("/return")
    public ResponseEntity<Loan> returnBook(@RequestBody ReturnRequest request) {
        Loan loan = loanService.returnBook(request.inventoryNumber());
        return ResponseEntity.ok(loan);
    }
}
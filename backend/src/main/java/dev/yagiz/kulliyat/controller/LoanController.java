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

@RestController
@RequestMapping("/api/loans")
public class LoanController {
    private final LoanService loanService;

    public LoanController(LoanService loanService) { this.loanService = loanService; }

    @GetMapping
    public ResponseEntity<PageResponse<LoanResponse>> getLoans(
            @RequestParam(defaultValue = "ALL") LoanStatus status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "20") int size) {
        return ResponseEntity.ok(PageResponse.from(loanService.getLoans(status, page, size), LoanResponse::from));
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

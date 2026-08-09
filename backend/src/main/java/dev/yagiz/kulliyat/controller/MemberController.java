package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.MemberRequest;
import dev.yagiz.kulliyat.dto.ApiDtos.MemberResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.PageResponse;
import dev.yagiz.kulliyat.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.time.LocalDate;

@RestController
@RequestMapping("/api/members")
public class MemberController {
    private final MemberService memberService;

    public MemberController(MemberService memberService) { this.memberService = memberService; }

    @PostMapping
    public ResponseEntity<MemberResponse> registerMember(@Valid @RequestBody MemberRequest request) {
        return ResponseEntity.ok(MemberResponse.from(memberService.registerMember(request)));
    }

    @GetMapping
    public ResponseEntity<PageResponse<MemberResponse>> getAllMembers(
            @RequestParam(required = false) String search,
            @RequestParam(required = false) LocalDate joinedFrom,
            @RequestParam(required = false) LocalDate joinedTo,
            @RequestParam(required = false) String loanState,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "lastName") String sortBy,
            @RequestParam(defaultValue = "asc") String sortDirection) {
        return ResponseEntity.ok(PageResponse.from(memberService.getAllMembers(search, joinedFrom, joinedTo, loanState, page, size, sortBy, sortDirection), MemberResponse::from));
    }

    @GetMapping("/{id}")
    public ResponseEntity<MemberResponse> getMember(@PathVariable Long id) {
        return ResponseEntity.ok(MemberResponse.from(memberService.getMember(id)));
    }

    @PutMapping("/{id}")
    public ResponseEntity<MemberResponse> updateMember(@PathVariable Long id, @Valid @RequestBody MemberRequest request) {
        return ResponseEntity.ok(MemberResponse.from(memberService.updateMember(id, request)));
    }
}

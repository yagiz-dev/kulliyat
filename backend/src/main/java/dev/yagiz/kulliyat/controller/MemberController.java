package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.dto.ApiDtos.MemberRequest;
import dev.yagiz.kulliyat.dto.ApiDtos.MemberResponse;
import dev.yagiz.kulliyat.dto.ApiDtos.PageResponse;
import dev.yagiz.kulliyat.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "lastName") String sortBy) {
        return ResponseEntity.ok(PageResponse.from(memberService.getAllMembers(search, page, size, sortBy), MemberResponse::from));
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

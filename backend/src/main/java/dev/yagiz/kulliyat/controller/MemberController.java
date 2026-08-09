package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.Member;
import dev.yagiz.kulliyat.service.MemberService;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/members")
public class MemberController {

    private final MemberService memberService;

    public MemberController(MemberService memberService) {
        this.memberService = memberService;
    }

    @PostMapping
    public ResponseEntity<Member> registerMember(@Valid @RequestBody Member member) {
        Member savedMember = memberService.registerMember(member);
        return ResponseEntity.ok(savedMember);
    }

    @GetMapping
    public ResponseEntity<Page<Member>> getAllMembers(
            @RequestParam(required = false) String search,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "lastName") String sortBy) {

        Page<Member> members = memberService.getAllMembers(search, page, size, sortBy);
        return ResponseEntity.ok(members);
    }
}
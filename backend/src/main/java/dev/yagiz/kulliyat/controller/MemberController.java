package dev.yagiz.kulliyat.controller;

import dev.yagiz.kulliyat.entity.Member;
import dev.yagiz.kulliyat.service.MemberService;
import jakarta.validation.Valid;
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
    public ResponseEntity<Iterable<Member>> getAllMembers() {
        return ResponseEntity.ok(memberService.getAllMembers());
    }
}
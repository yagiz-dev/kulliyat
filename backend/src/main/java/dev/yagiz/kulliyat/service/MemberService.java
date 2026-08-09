package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.entity.Member;
import dev.yagiz.kulliyat.repository.MemberRepository;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    public Member registerMember(Member member) {
        if (memberRepository.existsByEmail(member.getEmail())) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu e-posta adresine sahip bir ziyaretçi kaydı zaten var.");
        }

        return memberRepository.save(member);
    }

    public Page<Member> getAllMembers(String search, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));

        if (search != null && !search.isBlank()) {
            return memberRepository.searchMembers(search, pageable);
        }

        return memberRepository.findAll(pageable);
    }
}
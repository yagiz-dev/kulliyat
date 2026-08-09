package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.dto.ApiDtos.MemberRequest;
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

    public Member registerMember(MemberRequest request) {
        ensureEmailAvailable(request.email(), null);
        ensurePhoneNumberAvailable(request.phoneNumber(), null);
        Member member = new Member();
        applyRequest(member, request);
        return memberRepository.save(member);
    }

    public Member getMember(Long id) {
        return memberRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Member not found"));
    }

    public Page<Member> getAllMembers(String search, int page, int size, String sortBy) {
        Pageable pageable = PageRequest.of(page, size, Sort.by(sortBy));
        return search != null && !search.isBlank() ? memberRepository.searchMembers(search, pageable) : memberRepository.findAll(pageable);
    }

    public Member updateMember(Long id, MemberRequest request) {
        Member member = getMember(id);
        ensureEmailAvailable(request.email(), member.getEmail());
        ensurePhoneNumberAvailable(request.phoneNumber(), member.getPhoneNumber());
        applyRequest(member, request);
        return memberRepository.save(member);
    }

    private void ensureEmailAvailable(String email, String currentEmail) {
        if ((currentEmail == null || !currentEmail.equalsIgnoreCase(email)) && memberRepository.existsByEmail(email)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu e-posta adresiyle kayıtlı bir üye zaten var");
        }
    }

    private void ensurePhoneNumberAvailable(String phoneNumber, String currentPhoneNumber) {
        if (phoneNumber == null || phoneNumber.isBlank()) return;
        if ((currentPhoneNumber == null || !currentPhoneNumber.equals(phoneNumber))
                && memberRepository.existsByPhoneNumber(phoneNumber)) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Bu telefon numarasıyla kayıtlı bir üye zaten var");
        }
    }

    private void applyRequest(Member member, MemberRequest request) {
        member.setFirstName(request.firstName());
        member.setLastName(request.lastName());
        member.setEmail(request.email());
        member.setPhoneNumber(request.phoneNumber());
    }
}

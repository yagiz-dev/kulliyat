package dev.yagiz.kulliyat.service;

import dev.yagiz.kulliyat.dto.ApiDtos.MemberRequest;
import dev.yagiz.kulliyat.entity.Member;
import dev.yagiz.kulliyat.repository.MemberRepository;
import dev.yagiz.kulliyat.repository.LoanRepository;
import dev.yagiz.kulliyat.dto.ApiDtos.MemberResponse;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.time.LocalDate;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class MemberService {
    private final MemberRepository memberRepository;
    private final LoanRepository loanRepository;

    public MemberService(MemberRepository memberRepository, LoanRepository loanRepository) {
        this.memberRepository = memberRepository;
        this.loanRepository = loanRepository;
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
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Üye kaydı bulunamadı"));
    }

    public Page<MemberResponse> getAllMembers(String search, LocalDate joinedFrom, LocalDate joinedTo, String loanState,
                                              int page, int size, String sortBy, String sortDirection) {
        String property = switch (sortBy) {
            case "firstName", "lastName", "joinedAt", "id" -> sortBy;
            default -> "firstName";
        };
        Sort.Direction direction = "desc".equalsIgnoreCase(sortDirection) ? Sort.Direction.DESC : Sort.Direction.ASC;
        Pageable pageable = PageRequest.of(page, size, Sort.by(direction, property));
        Page<Member> members = memberRepository.filter(normalize(search), joinedFrom == null ? null : joinedFrom.atStartOfDay(),
                joinedTo == null ? null : joinedTo.plusDays(1).atStartOfDay(), normalize(loanState), LocalDate.now(), pageable);
        List<Long> memberIds = members.getContent().stream().map(Member::getId).toList();
        Map<Long, long[]> counts = new HashMap<>();
        if (!memberIds.isEmpty()) {
            for (Object[] row : loanRepository.countOpenLoansByMemberIds(memberIds, LocalDate.now())) {
                counts.put((Long) row[0], new long[] { ((Number) row[1]).longValue(), ((Number) row[2]).longValue(), ((Number) row[3]).longValue() });
            }
        }
        return members.map(member -> {
            long[] memberCounts = counts.getOrDefault(member.getId(), new long[] { 0, 0, 0 });
            return MemberResponse.from(member, memberCounts[0], memberCounts[1], memberCounts[2]);
        });
    }

    private String normalize(String value) { return value == null || value.isBlank() ? null : value.trim(); }

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

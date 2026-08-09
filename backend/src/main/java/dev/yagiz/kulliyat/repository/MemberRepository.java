package dev.yagiz.kulliyat.repository;

import dev.yagiz.kulliyat.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberRepository extends JpaRepository<Member, Long> {
}
package com.seungchan.backend.repository;

import com.seungchan.backend.entity.MemberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<MemberEntity, Long> {
    Optional<MemberEntity> findByMbId(String mbId);
    long countByMbId(String mbId);
    long countByMbIdAndMbPw(String mbId, String mbPw);
}
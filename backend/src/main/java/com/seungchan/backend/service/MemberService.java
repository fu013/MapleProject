package com.seungchan.backend.service;

import com.seungchan.backend.dto.MemberDTO;
import com.seungchan.backend.entity.MemberEntity;
import com.seungchan.backend.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class MemberService {

        private final MemberRepository memberRepository;

        public String signup(MemberDTO member){
            memberRepository.save(MemberEntity.builder()
                .mbId(member.getMbId())
                .mbPw(member.getMbPw())
                .build());
        return "Success";
    }
}
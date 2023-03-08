package com.seungchan.backend.service;

import com.seungchan.backend.dto.MemberDTO;
import com.seungchan.backend.entity.MemberEntity;
import com.seungchan.backend.repository.MemberRepository;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.security.MessageDigest;

@Service
@RequiredArgsConstructor
@Slf4j
@Builder
public class MemberService {

    private final MemberRepository memberRepository;

    // 간단한 회원가입 기능 구현
    public String signup(MemberDTO member) throws Exception {
        if (member.getMbId() != null && member.getMbPw() != null) {
            long isIdMatch = memberRepository.countByMbId(member.getMbId());
            if(isIdMatch == 0) {
                memberRepository.save(MemberEntity.builder()
                        .mbId(member.getMbId())
                        .mbPw(encrpytSha256(member.getMbPw(), "10"))
                        .build());
                return "ok";
            } else {
                return "id_exist";
            }
        } else {
            return "no_value";
        }
    }
    // 세션을 이용한 로그인 기능 구현
    public String login(MemberDTO member) throws Exception {
        if (member.getMbId() != null && member.getMbPw() != null) {
            long isMember = memberRepository.countByMbId(member.getMbId());
            if(isMember >= 1) {
                long isPwMatch = memberRepository.countByMbIdAndMbPw(member.getMbId(), encrpytSha256(member.getMbPw(), "10"));
                if(isPwMatch >= 1) {
                    return "ok";
                } else {
                    return "pw_no_match";
                }
            } else {
                return "id_no_match";
            }
        } else {
            return "no_value";
        }
    }
    // 비밀번호 보안을 위한 SHA-256 단방향 암호화 로직 구현
    public String encrpytSha256(String str, String salt) throws Exception {
        String encStr = null;
        MessageDigest md = MessageDigest.getInstance("SHA-256");
        md.update(salt.getBytes("UTF-8"));
        byte[] bytes = md.digest(str.getBytes("UTF-8"));
        StringBuilder sb = new StringBuilder();
        for(int i = 0; i < bytes.length; i++) {
            sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16).substring(1));
        }
        encStr = sb.toString();
        return encStr;
    }
}
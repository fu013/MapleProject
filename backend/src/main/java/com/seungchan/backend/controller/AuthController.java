package com.seungchan.backend.controller;

import com.seungchan.backend.dto.MemberDTO;
import com.seungchan.backend.service.BucketService;
import com.seungchan.backend.service.MemberService;
import io.github.bucket4j.Bucket;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RequestMapping("api/auth/")
@RequiredArgsConstructor
@RestController
public class AuthController {
    private final MemberService memberService;
    private final BucketService bucketService;
    @PostMapping("signup")
    public ResponseEntity signup(HttpServletRequest request, @RequestBody MemberDTO member) throws Exception {
        Bucket bucket = bucketService.resolveBucket(request);
        log.info("signup IP = {}", request.getRemoteAddr());
        log.info("mbId = {}, mbPw = {}", member.getMbId(), member.getMbPw());

        // 트래픽 요청제한 설정
        if (bucket.tryConsume(1)) {
            if(memberService.signup(member).equals("ok")) {
                return new ResponseEntity("ok", HttpStatus.CREATED);
            } else {
                return new ResponseEntity(memberService.signup(member), HttpStatus.BAD_REQUEST);
            }
        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("[트래픽초과] 잠시 기다렸다가 다시 이용해주세요.");
        }
    }
    @PostMapping("login")
    public ResponseEntity login(HttpServletRequest request, @RequestBody MemberDTO member) throws Exception {
        Bucket bucket = bucketService.resolveBucket(request);
        log.info("login IP = {}", request.getRemoteAddr());
        log.info("mbId = {}, mbPw = {}", member.getMbId(), member.getMbPw());

        // 트래픽 요청제한 설정
        if (bucket.tryConsume(1)) {
            if(memberService.login(member).equals("ok")) {
                return new ResponseEntity("ok", HttpStatus.CREATED);
            } else {
                return new ResponseEntity(memberService.login(member), HttpStatus.BAD_REQUEST);
            }
        } else {
            return ResponseEntity.status(HttpStatus.TOO_MANY_REQUESTS).body("[트래픽초과] 잠시 기다렸다가 다시 이용해주세요.");
        }
    }
}
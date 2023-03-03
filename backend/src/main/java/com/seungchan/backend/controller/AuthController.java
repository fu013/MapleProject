package com.seungchan.backend.controller;

import com.seungchan.backend.dto.MemberDTO;
import com.seungchan.backend.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Slf4j
@RestController
@RequestMapping("member")
@RequiredArgsConstructor
public class AuthController {
    private final MemberService memberService;
    @PostMapping("api/login")
    public ResponseEntity login(@RequestBody MemberDTO member) {
        log.info("userId = {}, password = {}, userName = {}", member.getMbId(), member.getMbPw());
        if(memberService.signup(member).equals("Success")) {
            return new ResponseEntity(HttpStatus.CREATED);
        }
        return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
}
package com.seungchan.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;
 
import java.util.Arrays;
import java.util.List;

@RestController
public class HomeController {
    @PostMapping("api/login")
    public String Login() {
        return "along";
    }
}
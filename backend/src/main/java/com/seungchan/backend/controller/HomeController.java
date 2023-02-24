package com.seungchan.backend.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
 
import java.util.Arrays;
import java.util.List;

@RestController
public class HomeController {
    @GetMapping("hello")
    public List<String> Hello(){
        return Arrays.asList("7000");
    }
}
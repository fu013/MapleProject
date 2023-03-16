package com.seungchan.backend.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.imageio.ImageIO;
import java.awt.*;
import java.io.File;

@Slf4j
@RequestMapping("api/guild/")
@RequiredArgsConstructor
@RestController
public class GuildController {
    private final Logger logger = LoggerFactory.getLogger(this.getClass());
    @GetMapping("abc")
    public static void main(String[] args) {
        String result = null;
        try {
            ImageIO.scanForPlugins();
            File image = new File("C:/Users/82109/Desktop/메이플 일지/인기도 1111.jpg");
            Tesseract tesseract = new Tesseract();
            tesseract.setLanguage("kor");
            tesseract.setDatapath("C:/Program Files/Tesseract-OCR/tessdata");
            result = tesseract.doOCR(image);
        } catch (TesseractException e) {
            e.printStackTrace();
        }
        System.out.println(result);
    }
}
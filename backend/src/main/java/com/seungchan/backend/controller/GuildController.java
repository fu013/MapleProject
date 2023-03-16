package com.seungchan.backend.controller;

import lombok.RequiredArgsConstructor;
import net.sourceforge.tess4j.Tesseract;
import net.sourceforge.tess4j.TesseractException;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;

import java.awt.Graphics2D;
import java.awt.image.*;
import java.io.*;
import javax.imageio.ImageIO;

@RequestMapping("api/guild/")
@RequiredArgsConstructor
@RestController
public class GuildController {

    @GetMapping("abc")
    public static void main( String args[ ] ) throws Exception
    {
        File f = new File("/home/ubuntu/seungchan/test-images/example.png");
        BufferedImage inputImage = ImageIO.read(f);
        double d = inputImage.getRGB(inputImage.getTileWidth( ) / 2, inputImage.getTileHeight() / 2);
        if ( d >= -1.4211511E7 && d < -7254228 ) {
            processImg( inputImage, 3f, -10f );
        }
        else if ( d >= -7254228 && d < -2171170 ) {
            processImg( inputImage, 1.455f, -47f );
        }
        else if ( d >= -2171170 && d < -1907998 ) {
            processImg( inputImage, 1.35f, -10f );
        }
        else if ( d >= -1907998 && d < -257 ) {
            processImg( inputImage, 1.19f, 0.5f );
        }
        else if ( d >= -257 && d < -1 ) {
            processImg( inputImage, 1f, 0.5f );
        }
        else if ( d >= -1 && d < 2 ) {
            processImg( inputImage, 1f, 0.35f );
        }
        System.out.println("naong-finished");
    }
    public static void processImg(BufferedImage inputImage, float scaleFactor, float offset) throws IOException, TesseractException {
        System.out.println("naong-process");
        BufferedImage outputImage = new BufferedImage(1050, 1024, inputImage.getType());
        Graphics2D grp = outputImage.createGraphics();
        grp.drawImage(inputImage, 0, 0, 1050, 1024, null);
        grp.dispose();
        RescaleOp rescaleOutput = new RescaleOp(scaleFactor, offset, null);
        BufferedImage finalOutputimage = rescaleOutput.filter(outputImage, null);
        ImageIO.write(finalOutputimage, "png", new File("/home/ubuntu/seungchan/test-images/example.png"));
        Tesseract tesseractInstance = new Tesseract();
        tesseractInstance.setLanguage("kor+eng");
        tesseractInstance.setPageSegMode(1);
        tesseractInstance.setOcrEngineMode(1);
        tesseractInstance.setDatapath("/usr/share/tesseract-ocr/5/tessdata/");
        String str = tesseractInstance.doOCR(finalOutputimage);
        System.out.println("naong-result: " + str);
    }
}
package com.seungchan.backend.service;

import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bucket4j;
import io.github.bucket4j.Refill;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class BucketService {
    // 과다 트래픽 방지를 위한 요청 제한 설정 버켓 라이브러리
    private final Map<String, Bucket> cache = new ConcurrentHashMap<>();

    // 요청자 IP 추출
    private String getHost(HttpServletRequest httpServletRequest) {
        return httpServletRequest.getHeader("Host");
    }

    // 버킷 가져오기
    public Bucket resolveBucket(HttpServletRequest httpServletRequest) {
        return cache.computeIfAbsent(getHost(httpServletRequest), this::newBucket);
    }

    // 버킷 생성
    private Bucket newBucket(String apiKey) {
        return Bucket4j.builder()
            // 버킷의 총 크기 = 5, 한 번에 충전되는 토큰 수  = 1, 300초마다 충전
            .addLimit(Bandwidth.classic(5, Refill.intervally(1, Duration.ofSeconds(300))))
            .build();
    }

}
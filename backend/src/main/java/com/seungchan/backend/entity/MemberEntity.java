package com.seungchan.backend.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "member")
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "mb_no")
    private long mbNo;
    @Column(name = "mb_id")
    private String mbId;
    @Column(name = "mb_pw")
    private String mbPw;
    @Column(name = "created_at")
    @CreationTimestamp
    private LocalDateTime createdAt;

}
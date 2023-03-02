package com.seungchan.backend.jpa;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "category")
public class MemberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "cate_seq")
    private long cateSeq;
    @Column(name = "cate_depth")
    private long cateDepth;
    @Column(name = "cate_nm")
    private String cateNm;
    @Column(name = "ins_id")
    private String indId;
    @Column(name = "ins_dttm")
    private LocalDateTime insDttm;
    @Column(name = "mod_id")
    private String modId;
    @Column(name = "mod_dttm")
    private LocalDateTime modDttm;

}
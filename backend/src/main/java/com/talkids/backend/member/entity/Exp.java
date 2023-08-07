package com.talkids.backend.member.entity;

import jakarta.persistence.*;
import lombok.Data;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name="Exp")
@Data
@EntityListeners(AuditingEntityListener.class)
public class Exp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="expId")
    private int expId;

    @Column(name="expPoint")
    private int expPoint;

    @Column(name="createdAt")
    @CreatedDate
    private LocalDateTime createdAt;

    /* ---------------------------------- */

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name="memberId")
    private Member member;
}

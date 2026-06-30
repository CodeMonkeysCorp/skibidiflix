package com.skibidiflix.backend.model;

import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.OffsetDateTime;

@Entity
@Table(name = "fatura")
public class Fatura {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_fatura")
    private Long idFatura;

    @Column(name = "id_situacao_fatura")
    private Long idSituacaoFatura = 1L; // 1 = pendente

    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "dt_criacao", insertable = false, updatable = false)
    private OffsetDateTime dtCriacao;

    @Column(name = "dt_expiracao", insertable = false, updatable = false)
    private OffsetDateTime dtExpiracao;

    @Column(name = "dt_pagamento")
    private OffsetDateTime dtPagamento;

    @Column(name = "vl_total")
    private BigDecimal vlTotal;

    public Long getIdFatura() { return idFatura; }
    public void setIdFatura(Long idFatura) { this.idFatura = idFatura; }
    public Long getIdSituacaoFatura() { return idSituacaoFatura; }
    public void setIdSituacaoFatura(Long idSituacaoFatura) { this.idSituacaoFatura = idSituacaoFatura; }
    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }
    public OffsetDateTime getDtCriacao() { return dtCriacao; }
    public OffsetDateTime getDtExpiracao() { return dtExpiracao; }
    public OffsetDateTime getDtPagamento() { return dtPagamento; }
    public void setDtPagamento(OffsetDateTime dtPagamento) { this.dtPagamento = dtPagamento; }
    public BigDecimal getVlTotal() { return vlTotal; }
    public void setVlTotal(BigDecimal vlTotal) { this.vlTotal = vlTotal; }
}
package com.skibidiflix.backend.model;

import jakarta.persistence.*;
import java.time.OffsetDateTime;

@Entity
@Table(name = "ingresso")
public class Ingresso {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_ingresso")
    private Long idIngresso;

    @Column(name = "id_sessao")
    private Long idSessao;

    @Column(name = "id_usuario")
    private Long idUsuario;

    @Column(name = "id_assento")
    private Long idAssento;

    @Column(name = "id_fatura")
    private Long idFatura;

    @Column(name = "id_tipo_ingresso")
    private Long idTipoIngresso;

    @Column(name = "dt_compra", insertable = false, updatable = false)
    private OffsetDateTime dtCompra;

    public Long getIdIngresso() { return idIngresso; }
    public Long getIdSessao() { return idSessao; }
    public void setIdSessao(Long idSessao) { this.idSessao = idSessao; }
    public Long getIdUsuario() { return idUsuario; }
    public void setIdUsuario(Long idUsuario) { this.idUsuario = idUsuario; }
    public Long getIdAssento() { return idAssento; }
    public void setIdAssento(Long idAssento) { this.idAssento = idAssento; }
    public Long getIdFatura() { return idFatura; }
    public void setIdFatura(Long idFatura) { this.idFatura = idFatura; }
    public Long getIdTipoIngresso() { return idTipoIngresso; }
    public void setIdTipoIngresso(Long idTipoIngresso) { this.idTipoIngresso = idTipoIngresso; }
    public OffsetDateTime getDtCompra() { return dtCompra; }
}
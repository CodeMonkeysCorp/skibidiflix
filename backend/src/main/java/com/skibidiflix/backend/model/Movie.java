package com.skibidiflix.backend.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "filme")
public class Movie {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id_filme") 
    private Long id_filme;

    @Column(name = "nm_filme") 
    private String nm_filme;

    @Column(name = "ds_filme") 
    private String ds_filme;

    @Column(name = "im_path") 
    private String im_path;

    @Column(name = "classificacao")
    private Integer classificacao;

    @Column(name = "duracao")
    private Integer duracao;

    public Long getId_filme() {
        return id_filme;
    }

    public String getNm_filme() {
        return nm_filme;
    }

    public String getDs_filme() {
        return ds_filme;
    }

    public String getIm_path() {
        return im_path;
    }

    public Integer getClassificacao() {
        return classificacao;
    }

    public Integer getDuracao() {
        return duracao;
    }

    public void setId_filme(Long id_filme) {
        this.id_filme = id_filme;
    }

    public void setNm_filme(String nm_filme) {
        this.nm_filme = nm_filme;
    }

    public void setDs_filme(String ds_filme) {
        this.ds_filme = ds_filme;
    }

    public void setIm_path(String im_path) {
        this.im_path = im_path;
    }

    public void setClassificacao(Integer classificacao) {
        this.classificacao = classificacao;
    }

    public void setDuracao(Integer duracao) {
        this.duracao = duracao;
    }

}
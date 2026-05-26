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
}
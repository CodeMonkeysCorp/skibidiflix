package com.skibidiflix.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skibidiflix.backend.model.Movie;

public interface MovieRepository extends JpaRepository<Movie, Long> {
}
package com.skibidiflix.backend.repository;

import com.skibidiflix.backend.model.Ingresso;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IngressoRepository extends JpaRepository<Ingresso, Long> {
}
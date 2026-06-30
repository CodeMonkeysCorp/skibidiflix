package com.skibidiflix.backend.controller;

import com.skibidiflix.backend.dto.PedidoFaturaDTO;
import com.skibidiflix.backend.service.FaturaService;
import com.skibidiflix.backend.repository.FaturaRepository;

import org.springframework.http.ResponseEntity;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/faturas")
@CrossOrigin(origins = "*") 
public class FaturaController {

    private final FaturaService faturaService;
    private final JdbcTemplate jdbcTemplate;

    public FaturaController(FaturaService faturaService, JdbcTemplate jdbcTemplate) {
        this.faturaService = faturaService;
        this.jdbcTemplate = jdbcTemplate;
    }

    @PostMapping
    public ResponseEntity<?> criarFatura(@RequestBody PedidoFaturaDTO pedido) {
        try {
            Long idUsuarioLogado = 1L;
            
            var faturaGerada = faturaService.gerarFaturaEIngressos(pedido, idUsuarioLogado);
            
            return ResponseEntity.ok(faturaGerada);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Erro ao processar fatura: " + e.getMessage());
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> buscarFaturaPorId(@PathVariable Long id) {
        try {
            var fatura = jdbcTemplate.queryForMap(
                "SELECT id_fatura as \"idFatura\", vl_total as \"vlTotal\", id_situacao_fatura as \"idSituacaoFatura\" FROM fatura WHERE id_fatura = ?",
                id
            );
            return ResponseEntity.ok(fatura);
        } catch (Exception e) {
            return ResponseEntity.status(404).body("Fatura não encontrada ou pendente de processamento.");
        }
    }
}
package com.skibidiflix.backend.service;

import com.skibidiflix.backend.dto.PedidoFaturaDTO;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;

import java.math.BigDecimal;
import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.HashMap;
import java.util.Map;

@Service
public class FaturaService {

    private final JdbcTemplate jdbcTemplate;

    public FaturaService(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Transactional
    public Map<String, Object> gerarFaturaEIngressos(PedidoFaturaDTO pedido, Long idUsuario) {
        
        BigDecimal total = BigDecimal.ZERO;
        for (PedidoFaturaDTO.IngressoQuantDTO item : pedido.ingressos()) {
            if (item.key().equalsIgnoreCase("inteira")) {
                total = total.add(new BigDecimal("47.40").multiply(BigDecimal.valueOf(item.count())));
            } else if (item.key().equalsIgnoreCase("meia")) {
                total = total.add(new BigDecimal("23.70").multiply(BigDecimal.valueOf(item.count())));
            }
        }

        Long idSessao;
        try {
            idSessao = jdbcTemplate.queryForObject(
                "SELECT id_sessao FROM sessao WHERE id_filme = ? LIMIT 1",
                Long.class,
                pedido.id_filme()
            );
        } catch (Exception e) {
            throw new RuntimeException("Nenhuma sessão encontrada para o filme informado.");
        }

        String sqlFatura = "INSERT INTO fatura (id_usuario, vl_total, id_situacao_fatura) VALUES (?, ?, 1)";
        KeyHolder keyHolder = new GeneratedKeyHolder();

        final BigDecimal valorFinal = total;
        jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sqlFatura, Statement.RETURN_GENERATED_KEYS);
            ps.setLong(1, idUsuario);
            ps.setBigDecimal(2, valorFinal);
            return ps;
        }, keyHolder);

        Long idFaturaGerada = ((Number) keyHolder.getKeys().get("id_fatura")).longValue();

        int assentoIndex = 0;
        for (PedidoFaturaDTO.IngressoQuantDTO item : pedido.ingressos()) {
            Long idTipoIngresso = item.key().equalsIgnoreCase("inteira") ? 1L : 2L; 
            
            for (int i = 0; i < item.count(); i++) {
                if (assentoIndex >= pedido.assentos().size()) break;
                
                String codigoAssento = pedido.assentos().get(assentoIndex);
                Long idAssento = buscarIdAssentoPorCodigo(codigoAssento); 

                jdbcTemplate.update(
                    "INSERT INTO ingresso (id_sessao, id_usuario, id_assento, id_fatura, id_tipo_ingresso) VALUES (?, ?, ?, ?, ?)",
                    idSessao, idUsuario, idAssento, idFaturaGerada, idTipoIngresso
                );
                
                assentoIndex++;
            }
        }

        Map<String, Object> resposta = new HashMap<>();
        resposta.put("idFatura", idFaturaGerada);
        resposta.put("vlTotal", total);
        resposta.put("idSituacaoFatura", 1);
        return resposta;
    }
    
    private Long buscarIdAssentoPorCodigo(String codigoAssento) {
        try {
            String[] partes = codigoAssento.split("[RC]"); 
            String fila = partes[1];    
            String numero = partes[2];  

            return jdbcTemplate.queryForObject(
                "SELECT id_assento FROM assento WHERE fila = ? AND numero = ? LIMIT 1",
                Long.class,
                fila, numero
            );
        } catch (Exception e) {
            return 1L; 
        }
    }
}
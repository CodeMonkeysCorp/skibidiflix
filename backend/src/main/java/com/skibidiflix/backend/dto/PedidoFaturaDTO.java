package com.skibidiflix.backend.dto;

import java.util.List;

public record PedidoFaturaDTO(
    Long id_filme,
    String data,
    List<String> assentos,
    List<IngressoQuantDTO> ingressos
) {
    public record IngressoQuantDTO(String key, int count) {}
}
# SkibidiFlix
Sistema Web de Venda de Ingressos e Reserva de Assentos para Cinema

Integrantes:
- André Schultz
- Lucas Monich Nunes

Disciplina: Programação Web - Baseada em Projetos

Professor: Luiz Carlos Camargo

Figma: https://www.figma.com/design/BaB5IM46Xnb3kXFlSvh35j/Skibidi?node-id=0-1&t=wJFVKsJgkgN0REJn-1

# 1. Domínio do Problema
Contexto:
  Cinemas independentes precisam de sistemas confiáveis para a venda antecipada de ingressos online, garantindo que a experiência do usuário seja tranquila e rápida.

Problemas comuns:

- Venda duplicada do mesmo assento.

- Filas físicas extensas nas bilheterias antes da sessão.

- Dificuldade em gerenciar o catálogo de filmes em cartaz e seus respectivos horários.

- Compra dos ingressos e da comida em locais separados.

Solução Proposta:
O SkibidiFlix é uma aplicação Web para o gerenciamento de cartaz e venda de ingressos de cinema e itens de bomboniere.

O sistema permitirá:

- Cadastro e autenticação de usuários (Clientes e Admin).

- Cadastro e gerenciamento do catálogo de Filmes e Sessões (Admin).

- Visualização de filmes em cartaz e horários disponíveis.

- Seleção visual de assentos na sala de cinema.

- Transação de compra de ingressos (Garantindo o bloqueio do assento).

- Controle automático e bloqueio de assentos já vendidos/reservados.

# 2. Escopo do Projeto
Escopo Mínimo:
- 1 CRUD completo (Filmes e Sessões)
- 1 Transação (Reserva de assento e geração de ingresso com controle de concorrência)
- Autenticação com login/token
- API REST
- Persistência em banco relacional
- Aplicação Web funcional

# 3. Requisitos
Requisitos Funcionais:

RF01 - O sistema deve permitir cadastro de usuários clientes.

RF02 - O sistema deve permitir autenticação via login.

RF03 - O sistema deve permitir o CRUD de Filmes e Sessões (Apenas Admin).

RF04 - O sistema deve exibir uma matriz visual de assentos (livres/ocupados) para uma sessão.

RF05 - O sistema deve permitir que o cliente selecione um assento livre e realize a compra do ingresso.

RF06 - O sistema deve impedir (por meio de um bloqueio após o primeiro usuário selecionar o lugar) que dois usuários comprem o mesmo assento na mesma sessão simultaneamente.

RF07 - O sistema deve permitir que o usuário visualize seu histórico de ingressos comprados.


Requisitos Não Funcionais:

RNF01 - Arquitetura baseada em MVC no backend e Componentes no frontend.

RNF02 - Comunicação via API REST em formato JSON.

RNF03 - Armazenamento seguro dos dados, garantindo que as informações fiquem sempre interligadas e corretas (por exemplo, o sistema não vai permitir que exista um ingresso para uma sessão que já foi apagada).

RNF04 - Senhas armazenadas com hash criptográfico.

RNF05 - Controle transacional (ACID) rigoroso para evitar overbooking de poltronas. //seria uma boa ideia, na real

RNF06 - Versionamento de código via Git.

RNF07 - Tratamento de erros amigável no front-end em caso de falha na transação.

# 4. Arquitetura do Sistema
Arquitetura Client-Server:
  Angular (Frontend) > Spring Boot (Backend REST API) > PostgreSQL (Banco de Dados)

Padrão Arquitetural
  Model-View-Controller

Frontend:
  Angular

Backend:
  Java, PostgreSQL

![C1](https://www.plantuml.com/plantuml/dpng/RP11ZjH034NtEONfrI1rTuJ4YjMWHh01QSG8jiXTyIGMhggexC0mrs712JX1NmoRW0A8LHoh_ll-_reDcorPkaTSaYm3mMGswxE-R_ZvEB9DotbHQgaMesB7L7C_2vRG7DG6uND_UdguYTMxDw_xZ6hKVFNX58fxEyv1xunD24vFu00l6CU66S7DVZsglhxzo6SU-ANmVTVTKDDQhfAmcz8UTgTrslduddL1uGU42WcRuSCUI5ELYG1L_LbL8F1BvuR0PMoaMlMuU_mRYqFcugJdyMMrXaDjWNv5ZKfY12VSiMJIFQYhBzyfa1XCB1C2WbJ3oxVBrnhSxlQB6kKhtJ8uxOz40VUE3EzgMvD_eZB4i1qOFuaBPOpRtLSeOOtjbYg3symL6g7yD7vBihNqjxrtguiOhad-Lua3NB_MyOzwgoAXeTInkbv3HI6xzkkNB3y0)

![C2](https://www.plantuml.com/plantuml/dpng/bP9FRzim3CNl_XHSJWcGni2mqqxDd_v9aBLPxMBOAM1arXKgYmOffsk7VVT9pjfas6cdC3H_Ua-FEjU04hh6PH-iDwwh21v3QFLpdWi-JseR7hjTfoI6VI0V9eQRl7Ne4tEceN9sbyy_dMrIw_xBEczG0qbiRUUHGEj99cqwFrjFlz_UbzlrnMMvlLjUNPV3KPO56np1_2ESmS9YBTWWH0_lREmNJtPdAtlfx8yisv0e-w5nDfgXCGpcXsgGIcvQmOebdM1zBQJAEXYzGLWrriUvQVgr6lhP15wHXaGnQ6nJWv79YfTKRcVS-GhbPQX76n4vCJKOmSyC08wcXm_IfrN5mSi_9HIRQTAQ-hfpA6CeNregZDWsfFOo3ia36WARAWnsZz2Y82WvCiZfJYsx8EnHWM1ljKDdNx7_nc1G0hvEelE_hUpGF1sSp0uLJ3VBfBZ2FOwXQ2Kc1JFcS4X2o1kB85GBQXBrLBEnF8OWw1KDay9qlbm0WLBTnQP16Aw-bQD_n1UxOOK1TwZKwtlJNsE15MjIsx26MgZukkwJaGPVoIDqsg5OrZ6OI3kk6Oxxx3qzi3J9eyFepADBoh-ox8xSyMMSxE06zrHZZ0nX9loir6_zkYmtHGGJrJ-D_sIEmyUCuzML6uBuhsNhWyBTHL7sSHUtD_af_WwTHBIc_4ADq9wWUWjfjPdcgyLi7h7pEDyrxZS0)

![C3](https://www.plantuml.com/plantuml/dpng/XLJ1Sjj63BtpAr2Vf1dREhIddYpBKgECEbL5EPsUFD0IfZ1PxR8BK4tQwRyNIv4rdQJZYmI2x-4zOC6z4yMaxSaNtt5mlgq8ZggD_3YR9VppjcOzjeTMABaOb8BUkdYQDHv3vjo8LfuFiyKFDzkSUlnvCpkXA2LBFItYgOaXSvfSlzZCV__bSV-qMQxsJxlrJ-_sasbHAAidM7mFD_30M2Sy8PY7_xWaCBb7zv521VFjUcguyYCVkEALvqz5iJ1Ro87Iv3br3gjhk5hr8PJR-PKzpqFTUamvNE5VW0BkQ4AL1U_s--tLzANCms5IeU81XGnzZy75xES1goYPlusYTQBorqttH4bOb20AL1raEhBqT1_RK67wF3bSEZ36g1UOb4tYKCDzZ3gzciBV1G2yj3uHScrY_MoqiWzXnLwfwwGd3szowWDwhX0qceJ0-z_sGD2ag5HJRjeYb5kpc6M-qC9MZmjDFa_BGiXDfEZzHMj7eb-ajYaw4a68u6FDmQHgIeDuhp8IU6P_ebvXWOf6Yc-hB4FLH0ugq612y9pNzI95mR75NLsP2Ob4-ePk8g5qnbvvTtbwMtX7ZWu422PkIjXjWREg2NE48bOy3dBVrYpFRYHPsYyx6XtTA3DlF3k4ktt28EYKOq1_2nyeyND-8TbA4xqcUm4accTnJfGFU3W8xFtzhwacIlQJ_rbZOfAHcGTKXFUNxsKTbD8pEkh7ZW9MWIkiBBFA0x-6Ccl6QrY7EbaOWU1HMamSi_u_HR4ZF_ecHxky36T6sD4VBGkxI0AxPRatKcQyu4ORkGmEJnoE29kyQbz1HxirmWvRzXLyl1Al2Dtu3DxXNw5UdUWwi6C4lPmL3W8Z5yEiRQUazOgpUVvgiGUEYmt84lqPWOTXnXOgX5tqFbyTWwKUFBgWbf-iAqMm-yX0TnIgzkJ_1G00)

# 5. Tecnologias Utilizadas
- Java e Spring Boot

- Spring Data JPA

- Banco de Dados PostgreSQL

- Autenticação baseada em token (JWT)

- Angular (com Vite)

- Arquitetura baseada em componentes (ideal para renderizar a matriz de poltronas da sala de cinema).

# 6. Transação Principal
Compra de Ingresso e Reserva de Assento

Processo:

- Cliente seleciona o assento e clica em comprar.

- Início da Transação no Banco.

- O sistema verifica se o assento escolhido para aquela sessão específica ainda está disponível.

- Caso sim, insere o registro na tabela de ingresso e confirma a transação.

- Caso o assento já tenha sido ocupado por outra thread/usuário milissegundos antes, ocorre um conflito de integridade e o sistema faz o Rollback automático, retornando um aviso ao usuário: "Assento indisponível".

![C4](https://www.plantuml.com/plantuml/dpng/ZL91Rjim4Bph5GkTxAOMMg2d70B7CO86A7g8qmUioRMn2CaLk9IHjCZVAvkHmrQ1MjquEneEPtQf2MFglAiI9qTmymKMi6RSH_G8jWSSgfB2x5QCG41uY1WK3SgyPsuUUSkMRnq_LLMBvX7t1BKHtsYUxFf9OyKZXnf-LT1_vgW8FxJ3o9AnqxU0RnBsmBP0DYboZmNnD4R98xiJ_58LoXjInIdXZ1XqQqpqm9x0OiAl4e-62iwAzsioxD516yd82fN6rzs5VIJL_tr9vodAjIg59EDnubOcNTw8RoEMBeOWwyyrB1PGVsgQ3_MRgqimfr_WwiJEuKoHGoBVaryc-bIA1pRqPw7tT8HnasTb6cVzUsf5EKby1YwWWfdj5JpDGCcwWENh3YQMW0uYeUEV67CsirFsNKxbpdxCNMIT_ZWaZRc2ELmEzaeV1ugyOuDnpTfAu2qxjcXfza-nhOWZ3BcXoHJZ-PL3a1mInHqQUYUn8j2BuHAW9zQag-VDgw7hOB-N2pQsErx2UQ5xNWJ50ytEfw6i-Tkh_cgxQQxUytm9dU8KjsTmq8J1C5PB2hRpxZS0)

# 7. Organização da Dupla
Backend:

- Modelagem do banco relacional -> Lucas

- Implementação da API REST (CRUD Filmes e Sessões) -> Lucas

- Regras de negócio e Autenticação JWT -> Lucas

- Lógica de controle transacional da venda de ingressos -> André

Frontend:

- Desenvolvimento em Angular -> André

- Telas de catálogo de filmes e detalhes da sessão -> André

- Desenvolvimento da interface interativa de seleção de poltronas -> André

- Consumo da API e tratamento de erros de concorrência na tela -> Lucas

Ambos:

- Integração Front/Back.

- Testes da transação principal.

- Documentação e Apresentação.

# 8. Planejamento por Entrega
N1

- Estrutura inicial do projeto (Repositórios criados).

- Modelagem do Banco de Dados (DER).

- CRUD de Filme implementado (Backend e Frontend básico).

- Cadastro/Login de Usuários.

N2

- Implementação das Sessões de Cinema.

- Interface visual da Sala de Cinema (Matriz de Assentos).

- Implementação da Transação de Compra de Ingresso (Foco principal).

N3

- Sistema completamente integrado e funcional.

- Tratamento de exceções (avisos de assento ocupado).

- Ajustes de UX/UI.

- Deploy da aplicação.

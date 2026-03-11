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

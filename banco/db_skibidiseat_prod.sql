CREATE TABLE genero_filme (
    id_genero_filme SERIAL PRIMARY KEY,
    nm_genero_filme VARCHAR(50) NOT NULL
);

CREATE TABLE filme (
    id_filme SERIAL PRIMARY KEY,
    id_genero_filme INT REFERENCES genero_filme(id_genero_filme)
);

CREATE TABLE sala (
    id_sala SERIAL PRIMARY KEY
);

CREATE TABLE sessao (
    id_sessao SERIAL PRIMARY KEY,
    id_sala INT REFERENCES sala(id_sala),
    id_filme INT REFERENCES filme(id_filme),
    inicio TIMESTAMPTZ NOT NULL,
    fim TIMESTAMPTZ NOT NULL
);

CREATE TABLE usuario (
    id_usuario SERIAL PRIMARY KEY,
    nm_usuario VARCHAR(55),
    senha_hash VARCHAR(100)
);

CREATE TABLE tipo_assento (
    id_tipo_assento SERIAL PRIMARY KEY,
    ds_tipo_assento VARCHAR(25)
);

CREATE TABLE assento (
    id_assento SERIAL PRIMARY KEY,
    id_sala INT REFERENCES sala(id_sala) ON DELETE CASCADE,
    fila VARCHAR(2) NOT NULL,
    numero VARCHAR(2) NOT NULL,
    id_tipo_assento INT REFERENCES tipo_assento(id_tipo_assento),
    ativo BOOLEAN DEFAULT TRUE,

    UNIQUE (id_sala, fila, numero)
);

CREATE TABLE ingresso (
    id_ingresso SERIAL PRIMARY KEY,
    id_sessao INT REFERENCES sessao(id_sessao),
    id_usuario INT REFERENCES usuario(id_usuario),
    id_assento INT REFERENCES assento(id_assento),
    dt_compra TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,

    UNIQUE (id_sessao, id_assento)
);

CREATE TABLE acesso (
	id_acesso SERIAL PRIMARY KEY,
	id_usuario INT NOT NULL REFERENCES usuario(id_usuario),
    dt_acesso TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

ALTER TABLE usuario ADD COLUMN nm_email varchar(40);

-- 25/05/2026 18:11 --

ALTER TABLE filme ADD COLUMN nm_filme varchar(200);
ALTER TABLE filme ADD COLUMN ds_filme text;
ALTER TABLE filme ADD COLUMN im_path text;
ALTER TABLE filme DROP COLUMN id_genero_filme;
ALTER TABLE genero_filme DROP COLUMN nm_genero_filme;
ALTER TABLE genero_filme ADD COLUMN id_filme INT REFERENCES filme(id_filme);

CREATE TABLE genero (
	id_genero SERIAL PRIMARY KEY,
	nm_genero text
);

ALTER TABLE genero_filme ADD COLUMN id_genero INT REFERENCES genero(id_genero);

INSERT INTO filme(nm_filme,im_path) VALUES 
('Dragon Ball Z Super: Super Dragon Ball Ultra X Hyper Mega Super Hero Z Super Z','Goku.png'),
('Homem Aranha 12: De Volta a Fronteira do Além do Aranhaverso Inverso 3 Parte 5: Uma Nova Volta ao Lar','SpiderMan.png'),
('Batman: The Batman: Something in the Way','Batman.png'),
('Transformers: O Último Primeiro Recomeço da Extinção Final','Transformers.png'),
('Velozes & Furiosos: O Retorno da Família para Salvar a Família','Familia.png');

ALTER TABLE filme alter COLUMN ds_filme TYPE TEXT;

UPDATE filme
SET ds_filme = 'Após desbloquear uma transformação tão poderosa que cientistas consideram fisicamente impossível de ser animada quadro a quadro, Goku precisa enfrentar uma entidade ancestral capaz de destruir todos os universos conhecidos, desconhecidos e também alguns recém-criados apenas para este filme. Entre batalhas que duram semanas inteiras e diálogos sobre amizade, honra e superação gritados a volumes ensurdecedores, os Guerreiros Z precisarão ultrapassar seus próprios limites mais uma vez, agora em uma aventura ainda mais super, ultra e hiper.'
WHERE id_filme = 1;

UPDATE filme
SET ds_filme = 'Quando uma falha multiversal faz portais começarem a surgir entre dimensões paralelas alternativas inversas, Peter Parker é lançado em sua missão mais pessoal, emocional e contratualmente obrigatória até agora. Ao lado de dezenas de versões praticamente idênticas do Homem-Aranha, ele precisará atravessar fronteiras do Aranhaverso que talvez jamais devessem ter sido atravessadas, enquanto tenta finalmente descobrir o verdadeiro significado de voltar para casa pela décima segunda vez.'
WHERE id_filme = 2;

UPDATE filme
SET ds_filme = 'Nas ruas frias e constantemente molhadas de Gotham City, Bruce Wayne enfrenta sua investigação mais sombria até hoje. Assombrado pelo passado, pelo presente e pela trilha sonora melancólica tocando sem parar em sua cabeça, Batman mergulha em um caso brutal que o forçará a confrontar não apenas os criminosos da cidade, mas também sua própria incapacidade de conversar normalmente com qualquer ser humano. Uma experiência intensa, silenciosa e artisticamente deprimente.'
WHERE id_filme = 3;

UPDATE filme
SET ds_filme = 'Quando uma antiga ameaça cibernética ressurge para provocar o último primeiro recomeço da extinção final definitiva da humanidade, Optimus Prime e os Autobots precisam retornar à Terra para mais uma batalha colossal repleta de destruição urbana, discursos dramáticos e explosões suficientemente grandes para serem vistas do espaço. Entre alianças inesperadas, traições inevitáveis e robôs girando violentamente em câmera lenta, o destino do planeta estará novamente nas mãos de máquinas gigantes extremamente barulhentas.'
WHERE id_filme = 4;

UPDATE filme
SET ds_filme = 'Após uma ameaça misteriosa colocar toda a família em risco, Dom Toretto é forçado a reunir sua família para salvar a família antes que a família seja destruída por inimigos que não entendem o verdadeiro poder da família. Em uma corrida emocionante através de vários países convenientemente fechados para gravação, explosões impossíveis e carros desafiando todas as leis conhecidas da física, Dom descobrirá que, no fim das contas, nada é mais importante do que a família. Especialmente quando a família precisa proteger a família usando o poder da própria família.'
WHERE id_filme = 5;

-- 30/06/2026 18:51 (mentira)

CREATE TABLE situacao_fatura (
	id_situacao_fatura SERIAL PRIMARY KEY,
	ds_situacao text NOT NULL
);

INSERT INTO situacao_fatura(ds_situacao) VALUES ('Pendente'),('Cancelado'),('Pago');

CREATE TABLE fatura (
	id_fatura SERIAL PRIMARY KEY,
	id_situacao_fatura INT REFERENCES situacao_fatura(id_situacao_fatura) DEFAULT 1,
	id_usuario INT REFERENCES usuario(id_usuario),
	dt_criacao TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP,
	dt_expiracao TIMESTAMPTZ DEFAULT (CURRENT_TIMESTAMP + INTERVAL '1 hour'),
	dt_pagamento TIMESTAMPTZ DEFAULT NULL,
	vl_total NUMERIC DEFAULT 0
)

CREATE TABLE tipo_ingresso (
	id_tipo_ingresso SERIAL PRIMARY KEY,
	nm_tipo text NOT NULL
);

INSERT INTO tipo_ingresso(nm_tipo) VALUES ('Inteira'),('Meia');

ALTER TABLE ingresso ADD COLUMN id_fatura INT REFERENCES fatura(id_fatura);
ALTER TABLE ingresso ADD COLUMN id_tipo_ingresso INT REFERENCES tipo_ingresso(id_tipo_ingresso);

INSERT INTO sala(id_sala) VALUES (1);

INSERT INTO sessao(id_sala,id_filme,inicio,fim) VALUES (1,1,'2026-06-30 19:00:00-03', '2026-06-30 21:30:00-03');
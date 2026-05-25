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
ALTER TABLE filme ADD COLUMN im_capa text;
ALTER TABLE filme DROP COLUMN id_genero_filme;
ALTER TABLE genero_filme DROP COLUMN nm_genero_filme;
ALTER TABLE genero_filme ADD COLUMN id_filme INT REFERENCES filme(id_filme);

CREATE TABLE genero (
	id_genero SERIAL PRIMARY KEY,
	nm_genero text
)

ALTER TABLE genero_filme ADD COLUMN id_genero INT REFERENCES genero(id_genero);

INSERT INTO filme(nm_filme,im_capa) VALUES 
('Dragon Ball Z Super: Super Dragon Ball Ultra X Hyper Mega Super Hero Z Super Z','Goku.png'),
('Homem Aranha 12: De Volta a Fronteira do Além do Aranhaverso Inverso 3 Parte 5: Uma Nova Volta ao Lar','SpiderMan.png'),
('Batman: The Batman: Something in the Way','Batman.png')

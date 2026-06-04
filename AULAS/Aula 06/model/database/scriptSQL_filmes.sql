# Permite criar um database
drop database if exists db_filmes_20261_b;
create database if not exists db_filmes_20261_b;

# Permite escolher o database a ser utilizado
use db_filmes_20261_b;

create table tbl_filme (
	id 					int not null auto_increment primary key,
    nome 				varchar(80) not null,
    sinopse 			text not null,
    capa 				varchar(255) not null,
    data_lancamento 	date not null,
    duracao 			time not null,
    valor 				decimal(5,2) default 0,
    avaliacao 			decimal(3,2) default null
);

# Tabela de gênero cênico
create table tbl_genero (
	id     int not null auto_increment primary key,
    genero varchar(30) not null
);

insert into tbl_genero (genero) values
('Fantasia'),
('Documentário'),
('Terror'),
('Thriller'),
('Drama'),
('Suspense'),
('Comédia'),
('Animação'),
('Infantil'),
('Aventura'),
('Ação');

# Tabela de classificação indicativa
create table tbl_classificacao (
	id            int not null auto_increment primary key,
	classificacao varchar(5) not null,
    descricao     text,
    idade_minima  int default 0
);

insert into tbl_classificacao (classificacao, descricao, idade_minima) values
('L', 'Classificação livre para todos os públicos', 0),
('+10', 'Conteúdo indicado para maiores de 10 anos', 10),
('+12', 'Conteúdo indicado para maiores de 12 anos', 12),
('+14', 'Conteúdo indicado para maiores de 14 anos', 14),
('+16', 'Conteúdo indicado para maiores de 16 anos', 16),
('+18', 'Conteúdo indicado para maiores de 18 anos', 18);

# Tabela de sexo
create table tbl_sexo (
	id    int not null auto_increment primary key,
    sigla varchar(3) not null,
    sexo  varchar(15) not null
);

insert into tbl_sexo (sigla, sexo) values
('M', 'Masculino'),
('F', 'Feminino');

# Tabela de nacionalidade
create table tbl_nacionalidade (
	id            int not null auto_increment primary key,
    nacionalidade varchar(25) not null
);

insert into tbl_nacionalidade (nacionalidade) values
('Brasileiro'),
('Estadunidense'),
('Canadense'),
('Mexicano'),
('Espanhol'),
('Francês'),
('Argentino'),
('Português'),
('Australiano'),
('Uruguaio'),
('Russo');

# Tabela de foto
create table tbl_foto (
	id   int not null auto_increment primary key,
    foto varchar(255) not null
);

insert into tbl_foto (foto) values
('https://paternoster'),
('https://credoinunodeum');

# Tabela de atividade (ator, produtor, produtor executivo, roteirista)
create table tbl_atividade (
	id           int not null auto_increment primary key,
    area_atuacao varchar(40)
);

delete from tbl_filme;

alter table tbl_filme
	add column id_classificacao int not null,
    add constraint FK_CLASSIFICACAO_FILME
		foreign key (id_classificacao)
        references tbl_classificacao(id);
        
create table tbl_ator (
	id              int not null auto_increment primary key,
    nome            varchar(100) not null,
    data_nascimento date not null,
    inicio_carreira year not null,
    biografia       text not null,
    id_sexo         int not null,
    
    constraint FK_SEXO_ATOR
    foreign key (id_sexo)
    references tbl_sexo(id)
);

create table tbl_diretor (
	id              int not null auto_increment primary key,
    nome            varchar(100) not null,
    data_nascimento date not null,
	inicio_carreira year not null,
    id_sexo         int not null,
    
    constraint FK_SEXO_DIRETOR
    foreign key (id_sexo)
    references tbl_sexo(id)
);

create table tbl_filme_genero (
	id        int not null auto_increment primary key,
    id_filme  int not null,
    id_genero int not null,
    
    constraint FK_FILME_FILMEGENERO
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_GENERO_FILMEGENERO
    foreign key (id_genero)
    references tbl_genero(id)
);

create table tbl_diretor_foto (
	id         int not null auto_increment primary key,
    id_diretor int not null,
    id_foto    int not null,
    
    constraint FK_DIRETOR_DIRETORFOTO
    foreign key (id_diretor)
    references tbl_diretor(id),
    
    constraint FK_FOTO_DIRETORFOTO
    foreign key (id_foto)
    references tbl_foto(id)
);

create table tbl_diretor_nacionalidade (
	id               int not null auto_increment primary key,
    id_diretor       int not null,
    id_nacionalidade int not null,
    
    constraint FK_DIRETOR_DIRETORNACIONALIDADE
    foreign key (id_diretor)
    references tbl_diretor(id),
    
    constraint FK_NACIONALIDADE_DIRETORNACIONALIDADE
    foreign key (id_nacionalidade)
    references tbl_nacionalidade(id)
);

create table tbl_ator_foto (
	id      int not null auto_increment primary key,
    id_ator int not null,
    id_foto int not null,
    
    constraint FK_ATOR_ATORFOTO
    foreign key (id_ator)
    references tbl_ator(id),
    
    constraint FK_FOTO_ATORFOTO
    foreign key (id_foto)
    references tbl_foto(id)
);

create table tbl_ator_nacionalidade (
	id               int not null auto_increment primary key,
    id_ator          int not null,
    id_nacionalidade int not null,
    
    constraint FK_ATOR_ATORNACIONALIDADE
    foreign key (id_ator)
    references tbl_ator(id),
    
    constraint FK_NACIONALIDADE_ATORNACIONALIDADE
    foreign key (id_nacionalidade)
    references tbl_nacionalidade(id)
);

create table tbl_ator_atividade (
	id           int not null auto_increment primary key,
    id_ator      int not null,
    id_atividade int not null,
    
    constraint FK_ATOR_ATORATIVIDADE
    foreign key (id_ator)
    references tbl_ator(id),
    
    constraint FK_ATIVIDADE_ATORATIVIDADE
    foreign key (id_atividade)
    references tbl_atividade(id)
);

create table tbl_diretor_atividade (
	id           int not null auto_increment primary key,
    id_diretor   int not null,
    id_atividade int not null,
    
    constraint FK_DIRETOR_DIRETORATIVIDADE
    foreign key (id_diretor)
    references tbl_diretor(id),
    
    constraint FK_ATIVIDADE_DIRETORATIVIDADE
    foreign key (id_atividade)
    references tbl_atividade(id)
);

create table tbl_filme_ator (
	id       int not null auto_increment primary key,
    id_filme int not null,
    id_ator  int not null,
    
    constraint FK_FILME_FILMEATOR
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_ATOR_FILMEATOR
    foreign key (id_ator)
    references tbl_ator(id)
);

create table tbl_filme_diretor (
	id         int not null auto_increment primary key,
    id_filme   int not null,
    id_diretor int not null,
    
    constraint FK_FILME_FILMEDIRETOR
    foreign key (id_filme)
    references tbl_filme(id),
    
    constraint FK_DIRETOR_FILMEDIRETOR
    foreign key (id_diretor)
    references tbl_diretor(id)
);

insert into tbl_filme (nome, sinopse, capa, data_lancamento, duracao, valor, avaliacao, id_classificacao) values (
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02', '01:39:00', '50.60', '3', 2
), (
	'Homem Aranha: Um Novo Dia',
    'Em Homem-Aranha: Um Novo Dia, Peter Parker (Tom Holland) está completamente focado em sua vida acadêmica, almejando viver uma vida comum com o pessoal da sua faculdade e longe dos ‘’perigos’’ oferecidos pelo amigão da vizinhança. No entanto, um ataque inesperado coloca em risco a vida de seus amigos e Peter é obrigado a colocar o seu traje especial para salvar aqueles que ama. Do lado de aliados inesperados e tentando acabar com adversários cada vez piores, o Homem-Aranha usa toda a sua força para manter a paz na cidade. Além de Zendaya, o novo filme contará com a presença de Sadie Sink.',
    'https://br.web.img3.acsta.net/c_310_420/img/55/7c/557c22ce839ded98babe8e3224c16e4c.jpg',
    '2026-07-30', '02:50:00', '0.0', '5', 4
);

# Permite visualizar todas as tabelas existentes dentro do database
show tables;
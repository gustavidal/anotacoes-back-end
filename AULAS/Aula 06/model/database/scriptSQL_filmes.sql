# Permite criar um database
create database db_filmes_20261_b;

# Permite visualizar todos os databases existentes
show databases;

# Permite escolher o database a ser utilizado
use db_filmes_20261_b;

# Permite visualizar todas as tabelas existentes dentro do database
show tables;

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

insert into tbl_filme (
	nome,
    sinopse,
    capa,
    data_lancamento,
    duracao,
    valor,
    avaliacao
) values (
	'Super Mario Galaxy: O Filme',
    'Uma nova aventura leva Mario a enfrentar um inédito e ameaçador super vilão. Em Super Mario Galaxy: O Filme, o bigodudo encanador italiano e seus aliados embarcam numa aventura galáctica repleta de ação e momentos emocionantes depois de salvar o Reino dos Cogumelos.',
    'https://br.web.img3.acsta.net/c_310_420/img/5b/ea/5bea1aeac3323aeaaf82449a34fafbbf.jpg',
    '2026-04-02',
    '01:39:00',
    '50.60',
    '3'
);

# select * from tbl_genero;
# select * from tbl_filme order by id desc;
# select * from tbl_filme where id = 2;

# delete from tbl_filme where id > 20;

# Tabela de gênero cênico
create table tbl_genero (
	id     int not null auto_increment primary key,
    genero varchar(30) not null
);

# Tabela de classificação indicativa
create table tbl_classificacao (
	id            int not null auto_increment primary key,
	classificacao varchar(5) not null,
    descricao     text,
    idade_minima  int default 0
);

# Tabela de sexo
create table tbl_sexo (
	id    int not null auto_increment primary key,
    sigla varchar(3) not null,
    sexo  varchar(15) not null
);

# Tabela de nacionalidade
create table tbl_nacionalidade (
	id            int not null auto_increment primary key,
    nacionalidade varchar(25) not null
);

# Tabela de foto
create table tbl_foto (
	id   int not null auto_increment primary key,
    foto varchar(255) not null
);

# Tabela de atividade (ator, produtor, produtor executivo, roteirista)
create table tbl_atividade (
	id           int not null auto_increment primary key,
    area_atuacao varchar(40)
);
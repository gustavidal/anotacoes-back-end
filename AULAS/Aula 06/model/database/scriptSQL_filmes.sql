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



delete from tbl_filme;

select * from tbl_filme;

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
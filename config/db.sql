create database moneyFlow; 

use moneyFlow; 

create table `user` (
id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
nome varchar(30) not null, 
cognome varchar(30) not null, 
username varchar(30) not null, 
password varchar(64) not null, 
auth int not null,
level int not null
);

create table spesa(
id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
id_utente int unsigned not null, 
luogo varchar(50),
data date not null, 
`desc` varchar(100),
importo double not null, 
status int default(0) not null,
tipo_pagamento int not null,
id_categoria int unsigned not null,
proprietario_soldi int unsigned not null
);

create table categoria(
id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
nome nvarchar(30) not null
);

create table reddito(
id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
data date not null, 
somma double not null, 
provenienza varchar(30) not null,
status int default(0) not null,
id_utente int unsigned not null
);

create table banca(
id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
data date not null, 
operazione varchar(30),
importo double not null, 
status int default(0) not null,
id_utente int unsigned not null
);


alter table spesa add constraint fk_spesa_categoria foreign key (id_categoria) references categoria (id);
alter table spesa add constraint fk_spesa_user foreign key (id_utente) references `user`(id);
alter table reddito add constraint fk_reddito_user foreign key (id_utente) references `user`(id);
alter table banca add constraint fk_banca_user foreign key (id_utente) references `user`(id);
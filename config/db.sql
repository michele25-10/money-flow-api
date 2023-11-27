create database moneyFlow; 

use moneyFlow; 

create table log(
    id int unsigned not null auto_increment primary key, 
    ip_address varchar(15), 
    status bit not null,
    token varchar(255) null,
    body varchar(255) null,
    dataora datetime not null 
);

create table famiglia(
    id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
    cognome varchar(30) not null, 
)

create table `user` (
id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
nome varchar(30) not null, 
cognome varchar(30) not null, 
username varchar(30) not null, 
password varchar(64) not null, 
auth int not null,
level int not null,
id_famiglia int unsigned not null,
img_profilo BLOB null,
FOREIGN KEY (id_famiglia)
    REFERENCES famiglia(id)
);

create table spesa(
id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
id_utente int unsigned not null, 
luogo varchar(100),
data date not null, 
`desc` varchar(100),
importo double not null, 
tipo_pagamento int not null,
id_categoria int unsigned not null,
documento BLOB, 
FOREIGN KEY (id_utente)
    REFERENCES `user`(id),
FOREIGN KEY (id_categoria)
    REFERENCES categoria(id)
);

create table categoria(
id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
nome nvarchar(30) not null
);


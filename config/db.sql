create database moneyFlow; 

use moneyFlow; 

create table famiglia(
    id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
    nome varchar(30) unique not null, 
    n_componenti int not null, 
    utente_mongo_db varchar(60) null, 
    ip_mongo_db varchar(15) null, 
    password_mongo_db varchar(60) null
);

/*CREATE PROCEDURE generateUUID()
BEGIN
    DECLARE new_uuid CHAR(36);
    SET new_uuid = UUID();
    update utente set id = new_uuid where id = new.id;
end;*/

create table utente (
	id char(36) primary key,
	nome varchar(30) not null, 
	cognome varchar(30) not null, 
	email varchar(50) not null, 
	password varchar(64) not null, 
	telefono varchar(10) not null, 
	img BLOB null,
	flag_genitore bit default 0 not null,
	dev bit default 0 not null,
	id_famiglia int unsigned not null,
	FOREIGN KEY (id_famiglia)
    	REFERENCES famiglia(id)
    	on delete cascade
);

DELIMITER $$
CREATE TRIGGER before_insert_utente
BEFORE INSERT ON utente
FOR EACH ROW
BEGIN
    SET NEW.id = UUID();
END;
$$
DELIMITER ;

create table log(
    id int unsigned not null auto_increment primary key, 
	id_utente char(36) not null,
	tipo_operazione varchar(30) not null,
    ip_address varchar(15), 
	dataora datetime not null,
    token varchar(255) null,
    body JSON null,
	tabella varchar(30) null, 
	messaggio_errore varchar(100) null, 
	FOREIGN KEY (id_utente)
    	REFERENCES utente(id)
    	on delete cascade
);

create table categoria(
	id INT UNSIGNED NOT null AUTO_INCREMENT  PRIMARY key,
	nome varchar(30) not null,
	spesa_fissa bit not null
);

create table spesa(
	id INT UNSIGNED NOT NULL   AUTO_INCREMENT  PRIMARY key,
	id_utente char(36) not null, 
	luogo varchar(100),
	data date not null, 
	descrizione varchar(100),
	importo double not null, 
	tipo_pagamento int not null,
	id_categoria int unsigned not null,
	documento BLOB, 
	FOREIGN KEY (id_utente)
    	REFERENCES utente(id)
    	on delete cascade,
	FOREIGN KEY (id_categoria)
    	REFERENCES categoria(id)
);

create table autorizzazione(
	id INT UNSIGNED NOT null AUTO_INCREMENT  PRIMARY key,
	nome varchar(30) not null,
	descrizione varchar(60) null
);

create table autorizzazione_utente(
	id INT UNSIGNED NOT null AUTO_INCREMENT  PRIMARY key,
	id_utente char(36) not null, 
	id_autorizzazione int unsigned not null, 
	valore bit default 0 not null,
	FOREIGN KEY (id_utente)
    	REFERENCES utente(id)
    	on delete cascade,
	FOREIGN KEY (id_autorizzazione)
    REFERENCES autorizzazione(id)
	on delete cascade
);
-- Crea il database se non esiste
CREATE DATABASE IF NOT EXISTS moneyFlow;
USE moneyFlow;

-- Creazione utente solo se non esiste
CREATE USER IF NOT EXISTS 'web'@'%' IDENTIFIED BY 'web';
GRANT SELECT, INSERT, UPDATE, DELETE ON moneyFlow.* TO 'web'@'%';
FLUSH PRIVILEGES;

-- Creazione tabelle
CREATE TABLE IF NOT EXISTS famiglia(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) UNIQUE NOT NULL, 
    n_componenti INT NOT NULL, 
    utente_mongo_db VARCHAR(60) NULL, 
    ip_mongo_db VARCHAR(15) NULL, 
    password_mongo_db VARCHAR(60) NULL
);

CREATE TABLE IF NOT EXISTS utente (
    id CHAR(36) PRIMARY KEY,
    nome VARCHAR(30) NOT NULL, 
    cognome VARCHAR(30) NOT NULL, 
    email VARCHAR(50) NOT NULL, 
    password VARCHAR(64) NOT NULL, 
    telefono VARCHAR(10) NOT NULL, 
    img BLOB NULL,
    flag_genitore BIT DEFAULT 0 NOT NULL,
    dev BIT DEFAULT 0 NOT NULL,
    id_famiglia INT UNSIGNED NOT NULL,
    FOREIGN KEY (id_famiglia)
        REFERENCES famiglia(id)
        ON DELETE CASCADE
);

-- Trigger idempotente: elimina prima se esiste
DROP TRIGGER IF EXISTS before_insert_utente;
DELIMITER $$
CREATE TRIGGER before_insert_utente
BEFORE INSERT ON utente
FOR EACH ROW
BEGIN
    SET NEW.id = UUID();
END;
$$
DELIMITER ;

CREATE TABLE IF NOT EXISTS log(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    id_utente CHAR(36) NOT NULL,
    tipo_operazione VARCHAR(30) NOT NULL,
    ip_address VARCHAR(15), 
    dataora DATETIME NOT NULL,
    token VARCHAR(255) NULL,
    body JSON NULL,
    tabella VARCHAR(30) NULL, 
    messaggio_errore VARCHAR(100) NULL, 
    FOREIGN KEY (id_utente)
        REFERENCES utente(id)
        ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS categoria(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    spesa_fissa BIT NOT NULL
);

CREATE TABLE IF NOT EXISTS spesa(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_utente CHAR(36) NOT NULL, 
    luogo VARCHAR(100),
    data DATE NOT NULL, 
    descrizione VARCHAR(100),
    importo DOUBLE NOT NULL, 
    tipo_pagamento INT NOT NULL,
    id_categoria INT UNSIGNED NOT NULL,
    documento BLOB, 
    FOREIGN KEY (id_utente)
        REFERENCES utente(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_categoria)
        REFERENCES categoria(id)
);

CREATE TABLE IF NOT EXISTS autorizzazione(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(30) NOT NULL,
    descrizione VARCHAR(60) NULL
);

CREATE TABLE IF NOT EXISTS autorizzazione_utente(
    id INT UNSIGNED NOT NULL AUTO_INCREMENT PRIMARY KEY,
    id_utente CHAR(36) NOT NULL, 
    id_autorizzazione INT UNSIGNED NOT NULL, 
    valore BIT DEFAULT 0 NOT NULL,
    FOREIGN KEY (id_utente)
        REFERENCES utente(id)
        ON DELETE CASCADE,
    FOREIGN KEY (id_autorizzazione)
        REFERENCES autorizzazione(id)
        ON DELETE CASCADE
);

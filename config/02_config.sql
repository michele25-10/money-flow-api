use moneyFlow; 

/*Autorizzazioni*/
insert into autorizzazione(nome, descrizione) 
values ("Dashboard", "Schermata di visualizzazione dati di tutta la famiglia"),
("Homepage", "Schermata di visualizzazione di tutti i propri dati"),
("Storico", "Visualizzazione dati di annate specifiche"),
("Spese Fisse", "Visualizzazione spese delle categorie di tipo fisse"),
("Lista Spese", "Visualizzazione lista delle proprie spese"),
("Documenti", "Visualizzazione di tutti i documenti familiari"), 
("Configurazione", "Impostazioni profilo utente"),
("Autorizzazioni", "Configurazione delle autorizzazioni per ogni tipo di utente"),
("Log", "Visualizzazione dei log dell'applicazione"); 

/*Categorie di spese*/
insert into categoria (nome, spesa_fissa)
values ("Enel Gas", 1), 
("Enel Luce", 1), 
("Acque Venete", 1), 
("Consorzio bonifica", 1), 
("Assicurazioni auto", 1), 
("Assicurazioni conducente", 1),
("Assicurazione famiglia", 1),
("Telefonia", 1),
("Internet", 1),
("Finanziamenti auto", 1),
("Manutenzione caldaia", 1),
("Manutenzione camino", 1),
("Manutenzioni auto", 1),
("Bollo auto", 1),
("Denuncia redditi", 1),
("Spese bancarie", 1),
("Spese mediche", 1),
("Spese impreviste", 1),
("Spese scolastiche", 1),
("Spese universitarie", 1), 
("Cibo", 0),
("Abbigliamento", 0),
("Divertimento", 0),
("Carburante", 0),
("Sport", 0),
("Tecnologia", 0),
("Regali", 0),
("Cura di sè", 0); 

/* Utenti di base per il testing */

INSERT INTO famiglia (nome, n_componenti, utente_mongo_db, ip_mongo_db, password_mongo_db)
VALUES ('Verdi', 4, NULL, NULL, NULL);

INSERT INTO utente (nome, cognome, email, password, telefono, img, flag_genitore, dev, id_famiglia)
VALUES
('Mario', 'Verdi', 'mario.verdi@example.com', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', '3331112233', NULL, b'1', b'0', 1),
('Anna', 'Verdi', 'anna.verdi@example.com', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', '3332223344', NULL, b'1', b'0', 1),
('Luca', 'Verdi', 'luca.verdi@example.com', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', '3333334455', NULL, b'0', b'0', 1),
('Giulia', 'Verdi', 'giulia.verdi@example.com', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', '3334445566', NULL, b'0', b'0', 1),
('Michele', 'Verdi', 'michele.verdi@example.com', 'b03ddf3ca2e714a6548e7495e2a03f5e824eaac9837cd7f159c67b90fb4b7342', '3334445566', NULL, b'0', b'1', 1);

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

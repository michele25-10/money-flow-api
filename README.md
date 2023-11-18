# money-flow

Software per gestire le entrate e le uscite economiche familiari

repository backend

# Funzionalità

Gli utenti apparteranno ad una famiglia all'interno della tabella famiglia contenente id e cognome.
In questa nuova versione più sicura del software l'utente ogni volta che tenta un login aggiornerà la tabella log con lo stato della richiesta e il risultato che ne consegue.

Ci sarà la possibilità di inserire le spese e per gli utenti di tipo admin anche la posssibilità di inserire nuove categorie.
Per le spese si potranno anche inserire dei documenti esempio fatture, scontrini, ecc.
Il server verrà poi configurato in maniera tale da poter fare dei backup ogni settimana scaricando in locale sul server dei file csv contenti tutte le informazioni del database.

La chiave di questo software sono proprio le statistiche che permettono di fare delle analisi dell'andamento delle spese familiari.

Si potranno inserire le spese anche alla fine di ogni mese caricando un file csv della banca, ci sarà una API che preso in input questo file inserirà le info nel database.

Le spese sono distinte dal tipo di pagamento: contante o bancomat.

Una ulteriore funzionalità utile sarebbe quella di duplicare una spesa.

L'utente potrà anche scaricare dei pdf o file excel con le spese di ogni mese, questo per avere dati tangibili su carta.

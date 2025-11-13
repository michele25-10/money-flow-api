USE moneyFlow;

-- Inizio transazione
START TRANSACTION;

-- Variabili per l'intervallo di anni
SET @anno_start = 2024;
SET @anno_end = 2025;

-- Inserimento spese fisse mensili per ogni utente
-- Consideriamo spese fisse come: Enel Gas, Enel Luce, Acque Venete, Assicurazioni auto
INSERT INTO spesa (id_utente, luogo, data, descrizione, importo, tipo_pagamento, id_categoria)
SELECT 
    u.id,
    'Pagamento automatico',
    STR_TO_DATE(CONCAT(yr.anno, '-', LPAD(m.month,2,'0'), '-01'), '%Y-%m-%d') AS data,
    CONCAT(c.nome, ' mensile') AS descrizione,
    CASE c.nome
        WHEN 'Enel Gas' THEN 50
        WHEN 'Enel Luce' THEN 45
        WHEN 'Acque Venete' THEN 30
        WHEN 'Assicurazioni auto' THEN 120
        ELSE 20
    END AS importo,
    1 AS tipo_pagamento,
    c.id
FROM utente u
JOIN categoria c ON c.spesa_fissa = 1
JOIN (
    SELECT 2024 AS anno UNION SELECT 2025
) AS yr
JOIN (
    SELECT 1 AS month UNION SELECT 2 UNION SELECT 3 UNION SELECT 4 UNION SELECT 5 UNION SELECT 6
    UNION SELECT 7 UNION SELECT 8 UNION SELECT 9 UNION SELECT 10 UNION SELECT 11 UNION SELECT 12
) AS m
WHERE u.id_famiglia = 1;

-- Inserimento spese variabili casuali
-- Consideriamo categorie non fisse
INSERT INTO spesa (id_utente, luogo, data, descrizione, importo, tipo_pagamento, id_categoria)
SELECT 
    u.id,
    CASE WHEN FLOOR(1 + RAND()*2) = 1 THEN 'Supermercato' ELSE 'Online' END AS luogo,
    DATE(CONCAT(yr.anno, '-', LPAD(FLOOR(1 + RAND()*12),2,'0'), '-', LPAD(FLOOR(1 + RAND()*28),2,'0'))) AS data,
    CONCAT(c.nome, ' acquisto') AS descrizione,
    ROUND(5 + RAND()*150,2) AS importo,
    FLOOR(RAND()*2) AS tipo_pagamento,
    c.id
FROM utente u
JOIN categoria c ON c.spesa_fissa = 0
JOIN (
    SELECT 2024 AS anno UNION SELECT 2025
) AS yr
WHERE u.id_famiglia = 1
LIMIT 500;  -- numero totale di spese variabili da generare

-- Conferma transazione
COMMIT;

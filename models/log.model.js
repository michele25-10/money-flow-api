const query = require('../utils/query');

const Log = {
    setLog: async (ip_address, status, token, body, dataora = new Date().toISOString()) => {
        const mysql = `INSERT INTO log(ip_address, status, token, body, dataora) VALUES ('${ip_address}', ${status}, '${token}', '${body}', '${dataora.toString()}')`;
        const result = await query(mysql);
        console.log(result);
        return result;
    }
}

module.exports = Log; 
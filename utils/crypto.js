/*const { createHash } = require('crypto');
const crypto = require('crypto');

const hash = (stringa) => {
    const result = createHash("sha256").update(stringa).digest("hex");
    return result;
}

const generateSecretKey = (secretKey) => {
    return crypto.createHash('sha256').update(secretKey).digest();
}

const encrypt = (text, secretKey) => {
    const iv = crypto.randomBytes(16);
    secretKey = generateSecretKey(secretKey);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(secretKey), iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        iv: iv.toString('hex'),
        encryptedText: encrypted
    };
}

// Funzione per decrittografare un testo con AES
const decrypt = (encryptedData, secretKey) => {
    secretKey = generateSecretKey(secretKey);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(encryptedData.iv, 'hex'));
    let decrypted = decipher.update(encryptedData.encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { hash, encrypt, decrypt };*/

const CryptoJS = require('crypto-js');

// Funzione per creare l'hash di una stringa utilizzando l'algoritmo SHA-256
const hash = (stringa) => {
    const result = CryptoJS.SHA256(stringa).toString();
    return result;
}

// Funzione per generare la chiave segreta utilizzando l'algoritmo SHA-256
const generateSecretKey = (secretKey) => {
    return CryptoJS.SHA256(secretKey);
}

// Funzione per crittografare un testo utilizzando AES-256-CBC
const encrypt = (text, secretKey) => {
    const iv = CryptoJS.lib.WordArray.random(16);
    secretKey = generateSecretKey(secretKey);
    const encrypted = CryptoJS.AES.encrypt(text, secretKey, { iv: iv });
    return {
        iv: iv.toString(CryptoJS.enc.Hex),
        encryptedText: encrypted.toString()
    };
}

// Funzione per decrittografare un testo crittografato con AES-256-CBC
const decrypt = (encryptedData, secretKey) => {
    secretKey = generateSecretKey(secretKey);
    const decrypted = CryptoJS.AES.decrypt(encryptedData.encryptedText, secretKey, { iv: CryptoJS.enc.Hex.parse(encryptedData.iv) });
    return decrypted.toString(CryptoJS.enc.Utf8);
}

module.exports = { hash, encrypt, decrypt };

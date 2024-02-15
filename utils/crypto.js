const { createHash } = require('crypto');
const crypto = require('crypto');

const hash = (stringa) => {
    const result = createHash("sha256").update(stringa).digest("hex");
    return result;
}

function generateSecretKey(secretKey) {
    return crypto.createHash('sha256').update(secretKey).digest();
}

function encrypt(text, secretKey) {
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
function decrypt(encryptedData, secretKey) {
    secretKey = generateSecretKey(secretKey);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(secretKey), Buffer.from(encryptedData.iv, 'hex'));
    let decrypted = decipher.update(encryptedData.encryptedText, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

module.exports = { hash, encrypt, decrypt };
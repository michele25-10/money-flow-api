const { createHash } = require('crypto');

const hash = (stringa) => {
    const result = createHash("sha256").update(stringa).digest("hex");
    return result;
}

module.exports = { hash };
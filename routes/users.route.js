const express = require('express');
const router = express.Router();

const { loginUser } = require('../controllers/users.controller');
//const validateToken = require('../middleware/validateTokenHandler');

//router.post('/register', registerUser);

router.post('/login', loginUser);

//funzione privata quindi viene gestito il token per verificare se è autorizzato
//router.post('/current', validateToken, currentUser);

module.exports = router;
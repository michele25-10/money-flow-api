const express = require('express');
const router = express.Router();

const authorizationController = require('./authorization.controller');
const authorizationValidation = require('./authorization.validation');
const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", authorizationController.getAllAuthorization);
router.get("/user/", validate(authorizationValidation.getAllAuthorizationUser), authorizationController.getAllAuthorizationUser);
router.put("/user/:idAuthorization", authorizationController.putAuthorizationUser);
module.exports = router;
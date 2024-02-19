const express = require('express');
const router = express.Router();

const familyController = require('./family.controller');
const familyValidation = require('./family.validation');
const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.all('*', validateToken);
router.post("/", validate(familyValidation.postFamily), familyController.postFamily);
router.put("/:id", validate(familyValidation.putFamily), familyController.putFamily);


module.exports = router;
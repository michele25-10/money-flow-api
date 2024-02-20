const express = require('express');
const router = express.Router();

const userController = require('./user.controller');
const userValidation = require('./user.validation');
const validate = require('../../middleware/JoiValidation');
const validateToken = require('../../middleware/validateToken');

router.all('*', validateToken);
router.get("/", userController.userInfo);
router.post("/", validate(userValidation.postUser), userController.postUser);
router.put("/", validate(userValidation.putUser), userController.putUser);
router.get("/family/", userController.getAllUserFamily);


module.exports = router;
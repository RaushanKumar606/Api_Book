const express = require("express");
const router = express.Router();
const AllController = require('../controller/userController');
const validate = require('../middleware/validateMiddle');
const loginSchema = require("../../validate/loginValidate");
const signUpSchema = require("../../validate/userValidate");

router.route('/').get(AllController.home);
router.route('/register').post(validate(signUpSchema),AllController.userRegister);
router.route('/login').post(validate(loginSchema),AllController.loginUser);
router.route('/contact').post(AllController.contact)

module.exports = router; 

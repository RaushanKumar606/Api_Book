const express = require("express");
const router = express.Router();
const AllController = require('../controller/userController');

router.route('/').get(AllController.home);
router.route('/register').post(AllController.userRegister);
router.route('/login').post(AllController.loginUser);

module.exports = router; 

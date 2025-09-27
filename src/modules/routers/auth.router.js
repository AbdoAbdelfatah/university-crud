const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../../middlewares/validate.middleware'); 
const studentSchema = require('../validators/students.validator'); 
const loginSchema = require('../validators/login.validator'); 

// Signup (validate student data)
router.post('/signup', validate(studentSchema), authController.signup);

// Signin (validate login data)
router.post('/signin', validate(loginSchema), authController.signin);

module.exports = router;

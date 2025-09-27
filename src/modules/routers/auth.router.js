const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const validate = require('../../middlewares/validate.middleware'); 
const studentSchema = require('../validators/students.validator'); 
const loginSchema = require('../validators/login.validator'); 

/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: User authentication endpoints
 */

/**
 * @swagger
 * /api/auth/signup:
 *   post:
 *     summary: Register a new student
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Student'
 *           example:
 *             name: "John Doe"
 *             email: "john.doe@example.com"
 *             age: 20
 *             password: "password123"
 *             enrolledCourses: []
 *     responses:
 *       201:
 *         description: Student registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "Student registered successfully"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               student:
 *                 _id: "60d5f2b8f1b2c8b3a4e5f6g7"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 age: 20
 *                 enrolledCourses: []
 *       400:
 *         description: Bad request - Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Validation failed"
 *               errors: ["Email is required", "Password must be at least 6 characters"]
 *       409:
 *         description: Conflict - Email already exists
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Email already exists"
 */
router.post('/signup', validate(studentSchema), authController.signup);

/**
 * @swagger
 * /api/auth/signin:
 *   post:
 *     summary: Login with email and password
 *     tags: [Authentication]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *           example:
 *             email: "john.doe@example.com"
 *             password: "password123"
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthResponse'
 *             example:
 *               success: true
 *               message: "Login successful"
 *               token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *               student:
 *                 _id: "60d5f2b8f1b2c8b3a4e5f6g7"
 *                 name: "John Doe"
 *                 email: "john.doe@example.com"
 *                 age: 20
 *                 enrolledCourses: []
 *       400:
 *         description: Bad request - Validation error
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *       401:
 *         description: Unauthorized - Invalid credentials
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Error'
 *             example:
 *               success: false
 *               message: "Invalid email or password"
 */
router.post('/signin', validate(loginSchema), authController.signin);

module.exports = router;

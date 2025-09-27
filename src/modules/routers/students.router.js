const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students.controller');
const validate = require('../../middlewares/validate.middleware');
const studentSchema = require('../validators/students.validator');
const auth = require('../../middlewares/auth.middleware'); 

// Create student
router.post('/',auth, validate(studentSchema), studentController.createStudent);

// Get all students
router.get('/',auth, studentController.getStudents);

// Get single student
router.get('/:id',auth, studentController.getStudent);

// Update student
router.put('/:id',auth, validate(studentSchema), studentController.updateStudent);

// Delete student
router.delete('/:id',auth, studentController.deleteStudent);

module.exports = router;

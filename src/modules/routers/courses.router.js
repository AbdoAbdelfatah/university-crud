const express = require('express');
const router = express.Router();
const courseController = require('../controllers/courses.controller');
const validate = require('../../middlewares/validate.middleware');
const courseSchema = require('../validators/courses.validator');
const auth = require('../../middlewares/auth.middleware'); 

// Create course
router.post('/', auth,validate(courseSchema), courseController.createCourse);

// Get all courses
router.get('/', auth,courseController.getCourses);

// Get single course
router.get('/:id',auth, courseController.getCourse);

// Update course
router.put('/:id',auth, validate(courseSchema), courseController.updateCourse);

// Delete course
router.delete('/:id',auth,courseController.deleteCourse);

module.exports = router;

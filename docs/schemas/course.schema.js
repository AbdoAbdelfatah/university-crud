/**
 * @swagger
 * components:
 *   schemas:
 *     Course:
 *       type: object
 *       required:
 *         - title
 *         - code
 *         - credits
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *           example: "60d5f2b8f1b2c8b3a4e5f6g8"
 *         title:
 *           type: string
 *           minLength: 2
 *           description: Course title
 *           example: "Introduction to Computer Science"
 *         code:
 *           type: string
 *           pattern: '^[A-Z0-9_-]{2,20}$'
 *           description: Unique course code
 *           example: "CS101"
 *         description:
 *           type: string
 *           description: Course description
 *           example: "Basic concepts of computer science and programming"
 *         credits:
 *           type: integer
 *           minimum: 1
 *           description: Number of credits for the course
 *           example: 3
 *         students:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of student IDs enrolled in this course
 *           example: ["60d5f2b8f1b2c8b3a4e5f6g7"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Course creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Course last update timestamp
 *     CourseResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Course created successfully"
 *         course:
 *           $ref: '#/components/schemas/Course'
 *     CoursesListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         courses:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Course'
 *         total:
 *           type: integer
 *           example: 25
 *         page:
 *           type: integer
 *           example: 1
 *         pages:
 *           type: integer
 *           example: 3
 */

module.exports = {};
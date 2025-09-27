/**
 * @swagger
 * components:
 *   schemas:
 *     Student:
 *       type: object
 *       required:
 *         - name
 *         - email
 *         - age
 *       properties:
 *         _id:
 *           type: string
 *           description: Auto-generated MongoDB ObjectId
 *           example: "60d5f2b8f1b2c8b3a4e5f6g7"
 *         name:
 *           type: string
 *           minLength: 3
 *           description: Student full name
 *           example: "John Doe"
 *         email:
 *           type: string
 *           format: email
 *           description: Student email address
 *           example: "john.doe@example.com"
 *         age:
 *           type: integer
 *           minimum: 16
 *           description: Student age
 *           example: 20
 *         password:
 *           type: string
 *           minLength: 6
 *           description: Student password (hashed when stored)
 *           example: "password123"
 *         enrolledCourses:
 *           type: array
 *           items:
 *             type: string
 *           description: Array of course IDs the student is enrolled in
 *           example: ["60d5f2b8f1b2c8b3a4e5f6g8"]
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Account creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Account last update timestamp
 *     StudentResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         message:
 *           type: string
 *           example: "Student created successfully"
 *         student:
 *           $ref: '#/components/schemas/Student'
 *     StudentsListResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: true
 *         students:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Student'
 *         total:
 *           type: integer
 *           example: 50
 *         page:
 *           type: integer
 *           example: 1
 *         pages:
 *           type: integer
 *           example: 5
 */

module.exports = {};
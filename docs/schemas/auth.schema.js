/**
 * @swagger
 * components:
 *   schemas:
 *     LoginRequest:
 *       type: object
 *       required:
 *         - email
 *         - password
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           description: User email address
 *           example: "john.doe@example.com"
 *         password:
 *           type: string
 *           minLength: 6
 *           description: User password
 *           example: "password123"
 *     AuthResponse:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           description: Whether the operation was successful
 *           example: true
 *         message:
 *           type: string
 *           description: Response message
 *           example: "Login successful"
 *         token:
 *           type: string
 *           description: JWT authentication token
 *           example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *         student:
 *           allOf:
 *             - $ref: '#/components/schemas/Student'
 *             - type: object
 *               description: Student information (password excluded)
 *     Error:
 *       type: object
 *       properties:
 *         success:
 *           type: boolean
 *           example: false
 *         message:
 *           type: string
 *           description: Error message
 *           example: "Validation failed"
 *         errors:
 *           type: array
 *           items:
 *             type: string
 *           description: Validation errors
 *           example: ["Email is required", "Password must be at least 6 characters"]
 */

module.exports = {};
const dotenv = require("dotenv");
dotenv.config({ path:"./src/utils/.env"});
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./DB/connection');
const setupSwagger = require('./docs');
const studentRoutes = require('./src/modules/routers/students.router');
const courseRoutes = require('./src/modules/routers/courses.router');
const authRoutes = require('./src/modules/routers/auth.router');

const app = express();

// Middleware
app.use(helmet());
app.use(express.json());

// Database connection
connectDB();

// Setup Swagger documentation
setupSwagger(app);

// API Routes
app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);

// Error handling middleware (should be last)
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found',
    documentation: `${req.protocol}://${req.get('host')}/api-docs`
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`API Documentation: http://localhost:${PORT}/api-docs`);
});
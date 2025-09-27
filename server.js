const dotenv = require("dotenv");
dotenv.config({ path:"./src/utils/.env"});
const express = require('express');
const helmet = require('helmet');
const connectDB = require('./DB/connection');
const studentRoutes = require('./src/modules/routers/students.router');
const courseRoutes = require('./src/modules/routers/courses.router');
const authRoutes = require('./src/modules/routers/auth.router');
const app = express();


app.use(helmet());
app.use(express.json());
connectDB();

app.use('/api/students', studentRoutes);
app.use('/api/courses', courseRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
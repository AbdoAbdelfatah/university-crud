const Student = require('../../../DB/models/students.model');
const jwt = require('jsonwebtoken');


const generateToken = (student) => {
  return jwt.sign(
    { id: student._id, email: student.email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );
};

// Signup
exports.signup = async (req, res, next) => {
  try {
    const { name, email, age, password } = req.body;

    const existing = await Student.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    const student = new Student({ name, email, age, password });
    await student.save();

    const token = generateToken(student);
    res.status(201).json({ token, student: { id: student._id, name, email, age } });
  } catch (err) {
    next(err);
  }
};

// Signin
exports.signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) return res.status(400).json({ message: 'Invalid email or password' });

    const isMatch = await student.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid email or password' });

    const token = generateToken(student);
    res.json({ token, student: { id: student._id, name: student.name, email } });
  } catch (err) {
    next(err);
  }
};

const Student = require('../../../DB/models/students.model');
const Course = require('../../../DB/models/coureses.model');

// Create a new course
exports.createCourse = async (req, res, next) => {
  try {
    const payload = req.body;
    const course = await Course.create(payload);

    if (payload.students && payload.students.length) {
      await Student.updateMany(
        { _id: { $in: payload.students } },
        { $addToSet: { enrolledCourses: course._id } }
      );
      await Course.findByIdAndUpdate(course._id, {
        $addToSet: { students: { $each: payload.students } },
      });
    }

    const result = await Course.findById(course._id).populate(
      'students',
      'name email age'
    );
    res.status(201).json(result);
  } catch (err) {
    next(err);
  }
};

// Get all courses
exports.getCourses = async (req, res, next) => {
  try {
    const courses = await Course.find().populate('students', 'name email age');
    res.json(courses);
  } catch (err) {
    next(err);
  }
};

// Get single course
exports.getCourse = async (req, res, next) => {
  try {
    const course = await Course.findById(req.params.id).populate(
      'students',
      'name email age'
    );
    if (!course) return res.status(404).json({ message: 'Course not found' });
    res.json(course);
  } catch (err) {
    next(err);
  }
};

// Update course
exports.updateCourse = async (req, res, next) => {
  try {
    const payload = req.body;
    const course = await Course.findById(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (payload.students) {
      const oldStudentIds = course.students.map((id) => id.toString());
      const newStudentIds = payload.students;

      const toAdd = newStudentIds.filter((id) => !oldStudentIds.includes(id));
      const toRemove = oldStudentIds.filter((id) => !newStudentIds.includes(id));

      if (toAdd.length) {
        await Student.updateMany(
          { _id: { $in: toAdd } },
          { $addToSet: { enrolledCourses: course._id } }
        );
      }
      if (toRemove.length) {
        await Student.updateMany(
          { _id: { $in: toRemove } },
          { $pull: { enrolledCourses: course._id } }
        );
      }

      course.students = newStudentIds;
    }

    if (payload.title) course.title = payload.title;
    if (payload.code) course.code = payload.code;
    if (payload.description !== undefined) course.description = payload.description;
    if (payload.credits !== undefined) course.credits = payload.credits;

    await course.save();
    const result = await Course.findById(course._id).populate(
      'students',
      'name email age'
    );
    res.json(result);
  } catch (err) {
    next(err);
  }
};

// Delete course
exports.deleteCourse = async (req, res, next) => {
  try {
    const course = await Course.findByIdAndDelete(req.params.id);
    if (!course) return res.status(404).json({ message: 'Course not found' });

    if (course.students && course.students.length) {
      await Student.updateMany(
        { _id: { $in: course.students } },
        { $pull: { enrolledCourses: course._id } }
      );
    }

    res.json({ message: 'Course deleted' });
  } catch (err) {
    next(err);
  }
};

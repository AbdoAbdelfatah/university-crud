const Student = require('../../../DB/models/students.model');
const Course = require('../../../DB/models/coureses.model');

exports.createStudent = async (req, res, next) => {
    try {
        const payload = req.body;
        const student = await Student.create(payload);

        if (payload.enrolledCourses && payload.enrolledCourses.length) {
            await Course.updateMany(
                { _id: { $in: payload.enrolledCourses } },
                { $addToSet: { students: student._id } }
            );
        }

        const result = await Student.findById(student._id).populate('enrolledCourses', 'title code credits');
        res.status(201).json(result);
    } catch (err) {
        next(err);
    }
};


exports.getStudents = async (req, res, next) => {
    try {
        const students = await Student.find().populate('enrolledCourses', 'title code credits');
        res.json(students);
    } catch (err) {
        next(err);
    }
};


exports.getStudent = async (req, res, next) => {
    try {
        const student = await Student.findById(req.params.id).populate('enrolledCourses', 'title code credits');
        if (!student) 
            return res.status(404).json({ message: 'Student not found' });
        res.json(student);
    } catch (err) {
        next(err);
    }
};


exports.updateStudent = async (req, res, next) => {
    try {
        const payload = req.body;
        const student = await Student.findById(req.params.id);
        if (!student) 
            return res.status(404).json({ message: 'Student not found' });
        
        if (payload.enrolledCourses) {
            const oldCourseIds = student.enrolledCourses.map(id => id.toString());
            const newCourseIds = payload.enrolledCourses;


            const toAdd = newCourseIds.filter(id => !oldCourseIds.includes(id));
            const toRemove = oldCourseIds.filter(id => !newCourseIds.includes(id));


            if (toAdd.length) {
                await Course.updateMany({ _id: { $in: toAdd } }, { $addToSet: { students: student._id } });
            }
            if (toRemove.length) {
                await Course.updateMany({ _id: { $in: toRemove } }, { $pull: { students: student._id } });
            }


            student.enrolledCourses = newCourseIds;
        }


        if (payload.name) student.name = payload.name;
        if (payload.email) student.email = payload.email;
        if (payload.age !== undefined) student.age = payload.age;


        await student.save();
        const result = await Student.findById(student._id).populate('enrolledCourses', 'title code credits');
        res.json(result);
    } catch (err) {
        next(err);
    }
};


exports.deleteStudent = async (req, res, next) => {
try {
    const student = await Student.findByIdAndDelete(req.params.id);
    if (!student) 
        return res.status(404).json({ message: 'Student not found' });


    if (student.enrolledCourses && student.enrolledCourses.length) {
        await Course.updateMany({ _id: { $in: student.enrolledCourses } }, { $pull: { students: student._id } });
    }
    res.json({ message: 'Student deleted' });
} catch (err) {
    next(err);
}
};
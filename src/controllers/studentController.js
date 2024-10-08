const StudentSchema = require("../models/studentModel");
const AuthSchema = require("../models/authModel");

// Create student (Registration)
const RegisterStudent = async (req, res) => {
  const { name, surname, login, password, teacher, group } = req.body;

  try {
    const existingAuth = await AuthSchema.findOne({ login });
    if (existingAuth) {
      return res.status(400).json({ error: "Login already exists" });
    }

    const newStudent = new StudentSchema({ name, surname, teacher, group });
    const savedStudent = await newStudent.save();

    const newAuth = new AuthSchema({
      login,
      password,
      studentId: savedStudent._id,
    });

    await newAuth.save();

    res.status(201).json({
      message: "Student registered successfully",
      student: savedStudent,
    });
  } catch (error) {
    res.status(400).json({ error: "Registration failed", details: error.message });
  }
};

// Read (Get one student)
const getStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentSchema.findById(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json(student);
  } catch (error) {
    res.status(500).json({ error: "Failed to get student", details: error.message });
  }
};

// Read (Get all students)
const getAllStudents = async (req, res) => {
  try {
    const students = await StudentSchema.find();
    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to get students", details: error.message });
  }
};

// Update student
const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { name, surname, teacher, group, coinBalance, avatar } = req.body;

  try {
    const student = await StudentSchema.findByIdAndUpdate(
      id,
      { name, surname, teacher, group, coinBalance, avatar },
      { new: true, runValidators: true }
    );

    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    res.status(200).json({ message: "Student updated successfully", student });
  } catch (error) {
    res.status(400).json({ error: "Failed to update student", details: error.message });
  }
};

// Delete student
const deleteStudent = async (req, res) => {
  const { id } = req.params;

  try {
    const student = await StudentSchema.findByIdAndDelete(id);
    if (!student) {
      return res.status(404).json({ error: "Student not found" });
    }

    await AuthSchema.findOneAndDelete({ studentId: id });

    res.status(200).json({ message: "Student deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete student", details: error.message });
  }
};

// Login student
const LoginStudent = async (req, res) => {
  const { login, password } = req.body;

  try {
    const auth = await AuthSchema.findOne({ login }).populate("studentId");

    if (!auth) {
      return res.status(404).json({ error: "Invalid login or password" });
    }

    if (auth.password !== password) {
      return res.status(400).json({ error: "Invalid login or password" });
    }

    const student = auth.studentId;
    res.status(200).json({
      message: "Login successful",
      student: {
        name: student.name,
        surname: student.surname,
        avatar: student.avatar,
        coinBalance: student.coinBalance,
        teacher: student.teacher,
        group: student.group,
      },
    });
  } catch (error) {
    res.status(500).json({ error: "Login failed", details: error.message });
  }
};

module.exports = {
  RegisterStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent,
  LoginStudent,
};

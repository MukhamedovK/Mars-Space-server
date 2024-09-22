const StudentSchema = require("../models/studentModel");
const AuthSchema = require("../models/authModel");

const RegisterStudent = async (req, res) => {
  const { name, surname, login, password, teacher, group } = req.body;

  try {
    // Check if the login already exists
    const existingAuth = await AuthSchema.findOne({ login });
    if (existingAuth) {
      return res.status(400).json({ error: "Login already exists" });
    }

    const newStudent = new StudentSchema({ name, surname, teacher, group });
    const savedStudent = await newStudent.save();

    const newAuth = new AuthSchema({
      login,
      password, // No hashing, saving as plain text
      studentId: savedStudent._id,
    });

    await newAuth.save();

    res.status(201).json({
      message: "Student registered successfully",
      student: savedStudent,
    });
  } catch (error) {
    res
      .status(400)
      .json({ error: "Registration failed", details: error.message });
  }
};

const LoginStudent = async (req, res) => {
  const { login, password } = req.body;

  try {
    const auth = await AuthSchema.findOne({ login }).populate("studentId");

    if (!auth) {
      return res.status(404).json({ error: "Invalid login or password" });
    }

    // Comparing plain-text passwords
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

module.exports = { RegisterStudent, LoginStudent };

const router = require('express').Router();
const {
  RegisterStudent,
  LoginStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

// Registration and login routes
router.post('/register', RegisterStudent);
router.post('/login', LoginStudent);

// Student CRUD routes
router.get('/get/:id', getStudent);          // Get a single student by ID
router.get('/get', getAllStudents);         // Get all students
router.put('/update/:id', updateStudent);       // Update a student by ID
router.delete('/delete/:id', deleteStudent);    // Delete a student by ID

module.exports = router;

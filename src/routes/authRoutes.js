const router = require('express').Router();
const {
  RegisterStudent,
  LoginStudent,
  getStudent,
  getAllStudents,
  updateStudent,
  deleteStudent
} = require('../controllers/studentController');

router.post('/register', RegisterStudent);
router.post('/login', LoginStudent);

router.get('/', getAllStudents);         // Get all students
router.get('/:id', getStudent);          // Get a single student by ID
router.put('/update/:id', updateStudent);       // Update a student by ID
router.delete('/delete/:id', deleteStudent);    // Delete a student by ID

module.exports = router;

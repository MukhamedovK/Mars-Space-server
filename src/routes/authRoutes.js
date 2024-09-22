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

router.get('/get/:id', getStudent);
router.get('/get', getAllStudents); 
router.put('/update/:id', updateStudent);
router.delete('/delete/:id', deleteStudent);

module.exports = router;

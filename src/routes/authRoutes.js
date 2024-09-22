const router = require('express').Router();
const { RegisterStudent, LoginStudent } = require('../controllers/studentController');

// Registration and login routes
router.post('/register', RegisterStudent);
router.post('/login', LoginStudent);

module.exports = router;

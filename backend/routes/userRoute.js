const express = require('express');
const router = express.Router();

const { signup, login, getUsers } = require('../controllers/userController');
const requireAuth = require('../middleware/requireAuth'); 

router.post('/login', login);
router.get('/users', requireAuth, getUsers);
router.post('/signup', signup);


module.exports = router;
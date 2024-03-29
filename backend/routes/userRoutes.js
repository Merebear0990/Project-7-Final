const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');

const userCtrl = require('../controllers/userController');

// ROUTES
router.post('/login', userCtrl.login);
router.post('/signup', userCtrl.signup);
router.delete('/:id', auth, userCtrl.deleteUser)

module.exports = router;
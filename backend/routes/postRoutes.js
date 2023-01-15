const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/postController');

// ROUTES
router.get('/', auth, postCtrl.getAllPosts );
router.post('/', auth, multer, postCtrl.addPost );
router.get('/one/:id', auth, postCtrl.getOnePost );
router.put('/:id', auth, postCtrl.setReadby);

module.exports = router;
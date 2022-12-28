const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//ROUTES
router.get('/', auth, postCtrl.getAllPosts );
router.get('/:id', auth, postCtrl.getAllPostsByUser);
router.post('/', auth, multer, postCtrl.addPost );
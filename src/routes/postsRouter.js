const express = require('express')
const router = express.Router();
const { getPosts, createPost, getPostsBySearch, updatePost, deletePost, likePost } = require('../controllers/postsController');
const auth = require('../middleware/auth');

router.get('/', getPosts);
router.get('/search', getPostsBySearch)
router.post('/', createPost);
router.patch('/:id', auth, updatePost);
router.delete('/:id', auth, deletePost);
router.patch('/:id/likePost', auth, likePost);

module.exports = router;

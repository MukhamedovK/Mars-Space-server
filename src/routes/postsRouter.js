const express = require('express')
const router = express.Router();
const { getPosts, createPost, getPostsBySearch, updatePost, deletePost, likePost } = require('../controllers/postsController');
const auth = require('../middleware/auth');

router.get('/', getPosts);
router.get('/search', getPostsBySearch)
router.post('/', createPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/:id/likePost', likePost);

module.exports = router;

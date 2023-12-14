const express = require('express')
const { getPosts, createPost } = require('../controllers/postController')

const router = express.Router()

router.route('/posts').get(getPosts)
router.route('/post/new').post(createPost)

module.exports = router
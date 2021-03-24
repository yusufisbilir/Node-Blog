const express = require('express');
const router = express.Router();
const blogController = require('../controller/blogController')


router.get('/',blogController.blog_index);
router.get('/:id',blogController.blog_content);

module.exports = router;
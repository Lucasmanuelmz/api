const { Router } = require('express');
const postController = require('../controllers/postController')
const postRouter = Router();

postRouter.post('/create', postController.createPost);

module.exports = postRouter;
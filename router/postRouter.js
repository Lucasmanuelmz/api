const { Router } = require('express');
const postController = require('../controllers/postController')
const postRouter = Router();
const passport = require('../config/passport');

postRouter.post('/posts', passport.authenticate('jwt', 
  {session: false}), postController.createPost);
postRouter.get('/posts', postController.getPosts);
postRouter.get('posts/:slug', postController.getPostBySlug);
postRouter.put('posts/:id', passport.authenticate('jwt', {session: false}), postController.updatePostById);
postRouter.delete('posts/id', passport.authenticate('jwt', {session: false}), postController.deletePostById);

module.exports = postRouter;
const { Router } = require('express');
const postController = require('../controllers/postController')
const postRouter = Router();
const passport = require('../config/passport');

postRouter.post('/create', passport.authenticate('jwt', 
  {session: false}), postController.createPost);

postRouter.get('/get', postController.getPosts);

module.exports = postRouter;
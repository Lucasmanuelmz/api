const { Router } = require('express');
const commentRouter = Router();
const CommentController = require('../controllers/commentsController');
const passport = require('../config/passport');

commentRouter.post('/posts/:id/comments', passport.authenticate('jwt', 
  { session: false }), CommentController.createComments);

module.exports = commentRouter;
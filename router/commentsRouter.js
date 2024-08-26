const { Router } = require('express');
const commentRouter = Router();
const CommentController = require('../controllers/commentsController');
const passport = require('../config/passport');

commentRouter.post('/comments', passport.authenticate('jwt', 
  { session: false }), CommentController.createComments);
commentRouter.get('/comments' , passport.authenticate('jwt', 
  { session: false }), CommentController.getComments);
commentRouter.put('/comments/:id' , passport.authenticate('jwt', 
  { session: false }), CommentController.updateCommentsById);
commentRouter.delete('/comments/id', passport.authenticate('jwt', 
  { session: false }), CommentController.deleteCommentById);

module.exports = commentRouter;
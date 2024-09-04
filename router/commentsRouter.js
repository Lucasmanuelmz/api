const { Router } = require('express');
const commentRouter = Router();
const CommentController = require('../controllers/commentsController');
const passport = require('../config/passport');
const validationComment = require('../validators/validatorComment');

commentRouter.post('/comments', passport.authenticate('jwt', 
  { session: false }), validationComment, CommentController.createComments);
commentRouter.get('/comments' , passport.authenticate('jwt', 
  { session: false }), CommentController.getComments);
commentRouter.put('/comments/:id' , passport.authenticate('jwt', 
  { session: false }), validationComment, CommentController.updateCommentsById);
commentRouter.delete('/comments/:id', passport.authenticate('jwt', 
  { session: false }), CommentController.deleteCommentById);

module.exports = commentRouter;
const { Router } = require('express');
const postController = require('../controllers/postController')
const postRouter = Router();
const passport = require('../config/passport');
const upload = require('../config/multer')
const validationText = require('../validators/validatorText')

postRouter.post('/posts', upload.single('file'), passport.authenticate('jwt', 
  {session: false}), validationText, postController.createPost);
postRouter.get('/posts', postController.getPosts);
postRouter.get('/posts/:slug', postController.getPostBySlug);
postRouter.put('/posts/:id', upload.single('file'), passport.authenticate('jwt', {session: false}), validationText, postController.updatePostById);
postRouter.delete('/posts/:id', passport.authenticate('jwt', {session: false}), postController.deletePostById);

module.exports = postRouter;
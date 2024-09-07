const { Router } = require('express');
const userController = require('../controllers/userController')
const userRouter = Router();
const passport = require('../config/passport');
const validationUser = require('../validators/validatorUser');
const validationUserUpdate = require('../validators/userUpdateValidator');
const upload = require('../config/multer')

userRouter.post('/posts/users', 
  upload.single('avatar'), 
  validationUser, 
  userController.createUser);

userRouter.get('/posts/users', 
  passport.authenticate('jwt', {session: false}), 
  userController.getUsers);

userRouter.get('/posts/users/:id', 
  passport.authenticate('jwt', {session: false}), 
  userController.getUserById);

userRouter.put('/posts/users/:id', 
  upload.single('avatar'), 
  passport.authenticate('jwt', {session: false}), 
  validationUserUpdate, 
  userController.updateUserById);

userRouter.delete('/posts/users/:id', 
  passport.authenticate('jwt', {session: false}), 
  userController.deleteUserById);

module.exports = userRouter;
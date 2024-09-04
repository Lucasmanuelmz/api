const { Router } = require('express');
const userController = require('../controllers/userController')
const userRouter = Router();
const passport = require('../config/passport');
const validationUser = require('../validators/validatorUser');

userRouter.post('/posts/users', validationUser, userController.createUser)
userRouter.get('/posts/users', passport.authenticate('jwt', 
  {session: false}), userController.getUsers);
userRouter.get('/posts/users/:id', passport.authenticate('jwt', 
  {session: false}), userController.getUserById);
userRouter.put('/posts/users/:id', passport.authenticate('jwt', 
    {session: false}), validationUser, userController.updateUserById);
userRouter.delete('/posts/users/:id', passport.authenticate('jwt', 
      {session: false}), userController.deleteUserById);

module.exports = userRouter;
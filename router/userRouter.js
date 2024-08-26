const { Router } = require('express');
const userController = require('../controllers/userController')
const userRouter = Router();
const passport = require('../config/passport')

userRouter.post('/posts/users', userController.createUser)
userRouter.get('/posts/users', passport.authenticate('jwt', 
  {session: false}), userController.getUsers);
userRouter.get('/posts/users/:id', passport.authenticate('jwt', 
  {session: false}), userController.getUserById);
userRouter.put('/posts/users/:id', passport.authenticate('jwt', 
    {session: false}), userController.updateUserById);
userRouter.delete('/posts/users/:id', passport.authenticate('jwt', 
      {session: false}), userController.deleteUserById);

module.exports = userRouter;
const { Router } = require('express');
const userController = require('../controllers/userController')
const userRouter = Router();
const passport = require('../config/passport')

userRouter.post('/create', userController.createUser)
userRouter.get('/get', passport.authenticate('jwt', 
  {session: false}), userController.getUsers);

module.exports = userRouter;
const { Router } = require('express');
const categoryController = require('../controllers/categoryController')
const categoryRouter = Router();
const passport = require('../config/passport');

categoryRouter.post('/create', passport.authenticate('jwt', 
  {session: false}) , categoryController.createCategory);

module.exports = categoryRouter;
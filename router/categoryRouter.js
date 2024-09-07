const { Router } = require('express');
const categoryController = require('../controllers/categoryController')
const categoryRouter = Router();
const passport = require('../config/passport');
const validationCategory = require('../validators/validatorCategory');

categoryRouter.get('/categories', 
  categoryController.getCategories);

categoryRouter.post('/categories', 
  passport.authenticate('jwt', {session: false}), 
  validationCategory, 
  categoryController.createCategory);

categoryRouter.get('/categories/:slug', 
  categoryController.getCategoryBySlug);

categoryRouter.put('/categories/:id', 
  passport.authenticate('jwt', {session: false}), 
  validationCategory,  
  categoryController.updateCategoryById);

categoryRouter.delete('/categories/:id', 
  passport.authenticate('jwt', {session: false}),  
  categoryController.deleteCategoryById);

module.exports = categoryRouter;
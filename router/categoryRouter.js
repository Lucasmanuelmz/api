const { Router } = require('express');
const categoryController = require('../controllers/categoryController')
const categoryRouter = Router();
const passport = require('../config/passport');

categoryRouter.post('/categories', passport.authenticate('jwt', 
  {session: false}) , categoryController.createCategory);
categoryRouter.get('/categories', categoryController.getCategories);
categoryRouter.get('/categories/:slug', categoryController.getCategoryBySlug);
categoryRouter.put('/categories/:id', passport.authenticate('jwt', {session: false}),  categoryController.updateCategoryById);
categoryRouter.delete('/categories/:id', passport.authenticate('jwt', {session: false}),  categoryController.deleteCategoryById);

module.exports = categoryRouter;
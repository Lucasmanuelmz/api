const { Router } = require('express');
const categoryController = require('../controllers/categoryController')
const categoryRouter = Router();

categoryRouter.post('/create', categoryController.createCategory)

module.exports = categoryRouter;
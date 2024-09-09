const { body } = require('express-validator');

const validationCategory = [
  body('name')
  .matches(/^[A-Za-zÀ-ÖØ-öø-ÿ\s]+$/)
  .withMessage('O nome da categoria deve conter apenas letras e espaços')
  .trim()  
  .notEmpty()  
  .withMessage('O nome da categoria é obrigatório')
];

module.exports = validationCategory;

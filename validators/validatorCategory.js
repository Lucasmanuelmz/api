const { body } = require('express-validator');

const validationCategory = [
  body('name')
    .trim()
    .isAlpha().withMessage('O nome da categoria deve conter apenas caracteres alfabéticos.')
    .isLength({ min: 6, max: 100 }).withMessage('O nome da categoria deve ter entre 6 e 100 caracteres.')
];

module.exports = validationCategory;

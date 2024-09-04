const {body} = require('express-validator');

const validationUser = [
  body('firstname').trim()
  .isAlpha().withMessage('O nome deve ter somente caracteres alfabeticas.')
  .isLength({min: 2, max: 100}).withMessage('O nome deve ter de 2 a 100 caracteres'),

  body('lastname').trim()
  .isAlpha().withMessage('O nome deve ter somente caracteres alfabeticas.')
  .isLength({min: 2, max: 100}).withMessage('O nome deve ter de 2 a 100 caracteres'),

  body('email').trim()
  .isEmail().withMessage('O email deve ter o caracter especial @.')
  .isLength({min: 10, max: 150}).withMessage('O email deve ter de 10 a 150 caracteres'),

  body('password').trim()
  .isStrongPassword({
    minLength: 6,
    minLowercase: 1,
    minUppercase: 1,
    minNumbers: 1,
    minSymbols: 1
  }).withMessage('A senha deve ter no mínimo 6 caracteres, incluindo uma letra maiúscula, uma minúscula, um número e um símbolo.')
  .isLength({ min: 6, max: 12 }).withMessage('A senha deve ter entre 6 e 12 caracteres.')
];

module.exports = validationUser;
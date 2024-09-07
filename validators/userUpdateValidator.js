const {body} = require('express-validator');

const validatorUserUpdate = [
    body('firstname').trim()
    .isAlpha().withMessage('O primeiro nome deve ter somente caracteres alfabeticas.')
    .isLength({min: 2, max: 100}).withMessage('E deve ter de 2 a 100 caracteres'),
  
    body('lastname').trim()
    .isAlpha().withMessage('O sobrenone deve ter somente caracteres alfabeticas.')
    .isLength({min: 2, max: 100}).withMessage('E deve ter de 2 a 100 caracteres'),
  
    body('email').trim()
    .isEmail().withMessage('O email deve ter o caracter especial @.')
    .isLength({min: 10, max: 150}).withMessage('O email deve ter de 10 a 150 caracteres'),
];

module.exports = validatorUserUpdate;
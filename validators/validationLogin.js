const { body } = require('express-validator');

const validationLogin = [
  body('email').trim()
    .isEmail().withMessage('Insira um email válido.'),

  body('password').trim()
    .isStrongPassword({
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1
    }).withMessage('A senha deve ter no mínimo 6 caracteres, com pelo menos 1 letra maiúscula, 1 minúscula, 1 número e 1 símbolo.')
];

module.exports = validationLogin;

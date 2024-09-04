const { body } = require('express-validator');

const validationText = [
  body('title')
    .trim()
    .notEmpty().withMessage('O título não deve estar vazio.'),
  
    body('sinopse')
    .trim()
    .notEmpty().withMessage('A deacricao não deve estar vazio.'),

  body('text')
    .trim()
    .notEmpty().withMessage('O campo para escrever o artigo não deve estar vazio.')
];

module.exports = validationText;

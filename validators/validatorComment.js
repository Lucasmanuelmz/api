const {body} = require('express-validator');

const validationComment = [
  body('comment').trim()
  .notEmpty().withMessage('Você não pode enviar um comentário vazio.')
  .isLength({min: 3}).withMessage('O comentário deve ter pelo menos 3 caracteres.')
]

module.exports = validationComment;
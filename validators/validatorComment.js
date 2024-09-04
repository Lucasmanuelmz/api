const {body} = require('express-validator');

const validationComment = [
  body('comment').trim()
  .notEmpty().withMessage('Voce nao pode enviar comentario com o campo vazio')
]

module.exports = validationComment;
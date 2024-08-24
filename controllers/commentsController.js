const Comment = require('../models/commentModel');

exports.createComments = (req, res) => {
  const { comment, postId, userId } = req.body;

  Comment.create({
    comment,
    postId,
    userId
  })

  .then(() => {
    res.status(201).json({msg: 'Comentario criado com sucesso!'})
  })

  .catch(error => {
   res.status(500).json({msg: 'O comentario nao foi criado', details: error.message})
  })
}
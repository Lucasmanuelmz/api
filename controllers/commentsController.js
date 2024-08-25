const Comment = require('../models/commentModel');
const Post = require('../models/postModel');


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
};

exports.getComments = (req, res) => {
  const id = req.params.id
  Comment.findByPk(id)

  .then(post=> {

    if(!post) { 
      return res.status(404).json({msg: 'Este artigo ainda nao tem comentarios, seja o primeiro a comentar'})
    };

    Comment.findAll()

    .then(comments => {

      if(!comments) { 
        return res.status(404).json({msg: 'Este artigo ainda nao tem comentarios, seja o primeiro a comentar'})
      };

      return res.status(200).json({comments});
    }) 

    .catch (error => {
      return res.status(500).json({error: 'Erro ao obter comentarios', details: error.message})
    })
  })

  .catch (error => {
    return res.status(500).json({error: 'Erro ao obter post', details: error.message})
  })
}
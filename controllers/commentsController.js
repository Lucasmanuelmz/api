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
  Post.findByPk(id)

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

exports.updateCommentsById = (req, res) => {
  const {comment, postId, userId, id} = req.body;

  Comment.update({
    comment: comment, 
    postId: postId,
    userId: userId
  },

{ where: { id: id } })

.then(() => {
  return res.status(201).json({msg: 'Comentario atualizado com sucesso'})
})

.catch(erro => {
  return res.status(500).json({msg: 'Erro ao atualizar o commentario'})
})
}

exports.deleteCommentById =(req, res) => {
  const id = req.params.id;

  Comment.destroy({ where: {id: id } })

  .then(() => {

    return res.status(200).json({msg: 'Comentario apagado com sucesso'})
  })

  .catch(error => {
    return res.status(500).json({msg: 'Erro ao apagar o comentario'})
  })
}
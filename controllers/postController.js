const slugify = require('slugify');
const Post = require('../models/postModel');

exports.createPost = (req, res) => {
 const { title, text, categoryId, userId, commentId } = req.body;

 Post.findOne({where: {title: title, text: text}})

  .then((post => {
    if(!post) {

      Post.create({
        title: title,
        text: text,
        slug: slugify(title),
        categoryId: categoryId,
        userId: userId,
        commentId: commentId
      })

      .then(() => {
        res.status(201).json({msg: 'Artigo criado com sucesso'})
      })

      .catch(error => {
        console.log('Erro '+error)
        res.status(500).json({error: 'Erro interno ao criar o artigo'})
      })

    } else {
      res.status(409).json({error: 'Este artigo ja existe'})
    }
  }))

  .catch(error => {
  res.status(500).json({error: 'Erro no servidor ', details: error.message})
  }) 
};

exports.getPosts = (req, res) => {
  Post.findAll()

  .then(posts => {

    if(!posts) {
      return res.status(404).json({msg: 'Posts nao encontrados'})
    }

    return res.status(200).json({posts})
  })

  .catch(error => {
    return res.status(500).json({msg: 'Erro ao obter os artigos', details: error.message})
  })
}
const slugify = require('slugify');
const Post = require('../models/postModel');

exports.createPost = (req, res) => {
 const { title, text, categoryId, userId } = req.body;

 Post.findOne({where: {title: title, text: text}})

  .then((post => {
    if(!post) {

      Post.create({
        title: title,
        text: text,
        slug: slugify(title),
        categoryId: categoryId,
        userId: userId
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
}
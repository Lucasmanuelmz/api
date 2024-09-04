const slugify = require('slugify');
const Post = require('../models/postModel');
const { validationResult } = require('express-validator');
const Port = process.env.PORT;

exports.createPost = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  
  const imageUrl = req.file? `http://localhost:${Port}/uploads/${req.file.filename}`: null;
 const { title, text, sinopse, categoryId, userId } = req.body;

if(title && sinopse && text && parseInt(categoryId) && parseInt(userId)) {

 Post.findOne({where: {title: title, text: text}})

  .then((post => {
    if(!post) {
      
      Post.create({
        title: title,
        sinopse: sinopse, 
        imageUrl: imageUrl,
        text: text,
        slug: slugify(title),
        CategoryId: categoryId,
        UserId: userId,
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
};

exports.getPostBySlug = (req, res) => {
  const slug = req.params.slug;

  Post.findOne({where: { slug: slug } })

  .then(post => {

    if(!post) {
      return res.status(404).json({msg: 'Artigo nao encontrados'})
    }

    return res.status(200).json({post})
  })

  .catch(error => {
    return res.status(500).json({msg: 'Erro ao obter o artigo', details: error.message})
  })
};

exports.updatePostById = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()});
  }
  const imageUrl = req.file? `http://localhost:${Port}/uploads/${req.file.filename}`: null;
  const { title, text, sinopse, categoryId, userId, id } = req.body;
 
  Post.findOne({where: {title, text}})
 
   .then((post => {
     if(post) {
 
       Post.update({
         title: title,
         text: text,
         slug: slugify(title),
         imageUrl: imageUrl,
         sinopse: sinopse,
         CategoryId: categoryId,
         UserId: userId,
       },
      
       {where: {id: id}}
      )
 
       .then(() => {
         res.status(201).json({msg: 'Artigo atualizado com sucesso'})
       })
 
       .catch(error => {
         console.log('Erro '+error)
         res.status(500).json({error: 'Erro interno ao atualizar o artigo'})
       })
 
     } else {
       res.status(409).json({error: 'Este artigo nao existe'})
     }
   }))
 
   .catch(error => {
   res.status(500).json({error: 'Erro no servidor ', details: error.message})
   }) 
 };

 exports.deletePostById = (req, res) => {
  const id = req.params.id;
 
    Post.destroy({where: { id: id } })
 
    .then(() => {

    res.status(204).json({msg: 'Artigo apagado com sucesso'})
    })
 
    .catch(error => {
     
     return res.status(500).json({error: 'Erro interno ao apagar o artigo'})
    })
 };
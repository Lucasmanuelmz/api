const slugify = require('slugify');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const User = require('../models/userModels');
const { validationResult } = require('express-validator');
const Category = require('../models/categoryModel');
const { Op } = require('sequelize');
require('dotenv').config();
const Port = process.env.PORT;
const baseUrl = process.env.BASE_URL || `http://localhost:${Port}`;

exports.createPost = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const imageUrl = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null;
  const { title, text, sinopse, categoryId, userId } = req.body;

  if (title && sinopse && text && parseInt(categoryId) && parseInt(userId)) {
    Post.findOne({ where: { title, text } })
      .then(post => {
        if (!post) {
          Post.create({
            title,
            sinopse,
            imageUrl,
            text,
            slug: slugify(title),
            CategoryId: categoryId,
            UserId: userId,
          })
            .then(() => res.status(201).json({ msg: 'Artigo criado com sucesso' }))
            .catch(error => {
              console.log('Erro ' + error);
              res.status(500).json({ error: 'Erro interno ao criar o artigo' });
            });
        } else {
          res.status(409).json({ error: 'Este artigo já existe' });
        }
      })
      .catch(error => res.status(500).json({ error: 'Erro no servidor', details: error.message }));
  }
};

exports.getPosts = (req, res) => {
  Post.findAll({
    include: [
      {
        model: Category,
        as: 'Category',
        attributes: ['id', 'name'], 
      },
      {
        model: User,
        as: 'User',
        attributes: ['id', 'firstname', 'lastname'], 
      }
    ]
  })
    .then(posts => {
      if (!posts) {
        return res.status(404).json({ msg: 'Posts não encontrados' });
      }
      return res.status(200).json({ posts });
    })
    .catch(error => res.status(500).json({ msg: 'Erro ao obter os artigos', details: error.message }));
};


exports.getPostBySlug = (req, res) => {
  const slug = req.params.slug;

  Post.findOne({
    where: { slug },
    include: [
      {
        model: Comment,
        as: 'Comments',
        include: [
          { 
            model: User, 
            as: 'User', 
            attributes: ['firstname', 'lastname', 'urlAvatar'] 
          }
        ],
      },
      {
        model: User,
        as: 'User',
        attributes: ['firstname', 'lastname', 'urlAvatar', 'bio'],
      },
      {
        model: Category,
        as: 'Category',
      }
    ],
  })
    .then(post => {
      if (!post) {
        return res.status(404).json({ msg: 'Artigo não encontrado' });
      }

      Post.findAll({
        where: { CategoryId: post.CategoryId, id: { [Op.ne]: post.id } },
        limit: 5,
        include: [{ model: User, as: 'User' }],
      })
        .then(relatedPosts => res.status(200).json({ post, relatedPosts }))
        .catch(error => res.status(500).json({ msg: 'Erro ao buscar artigos relacionados', details: error.message }));
    })
    .catch(error => res.status(500).json({ msg: 'Erro ao obter o artigo', details: error.message }));
};

exports.updatePostById = (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const imageUrl = req.file ? `${baseUrl}/uploads/${req.file.filename}` : null;
  const { title, text, sinopse, categoryId, userId, id } = req.body;

  Post.findOne({ where: { id } })
    .then(post => {
      if (post) {
        Post.update({
          title,
          text,
          slug: slugify(title),
          imageUrl,
          sinopse,
          CategoryId: categoryId,
          UserId: userId,
        },
        { where: { id } })
          .then(() => res.status(200).json({ msg: 'Artigo atualizado com sucesso' }))
          .catch(error => {
            console.log('Erro ' + error);
            res.status(500).json({ error: 'Erro interno ao atualizar o artigo' });
          });
      } else {
        res.status(404).json({ error: 'Este artigo não existe' });
      }
    })
    .catch(error => res.status(500).json({ error: 'Erro no servidor', details: error.message }));
};

exports.deletePostById = (req, res) => {
  const id = req.params.id;
 console.log(id)
  Post.destroy({ where: { id } })
    .then(() => res.status(200).json({ msg: 'Artigo apagado com sucesso' }))
    .catch(error => res.status(500).json({ error: 'Erro interno ao apagar o artigo' }));
};

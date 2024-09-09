const Category = require('../models/categoryModel');
const slugify = require('slugify');
const Post = require('../models/postModel');
const {validationResult} = require('express-validator')

exports.createCategory = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  const { name, position } = req.body;

  Category.findOne({ where: { name } })
    .then(existingCategory => {
      if (existingCategory) {
        return res.status(409).json({ error: 'Esta categoria já existe' });
      }
      
      Category.create({
        name,
        position,
        slug: slugify(name),
      })
      .then(category => {
        console.log('Categoria criada com sucesso: ', name);
        res.status(201).json({ msg: 'Categoria criada com sucesso', category });
      })
      .catch(error => {
        console.error('Erro ', error);
        res.status(500).json({ error: 'Erro interno ao criar a categoria', details: error.message });
      });
    })
    .catch(error => {
      res.status(500).json({ error: 'Erro interno ao buscar a categoria', details: error.message });
    });
};

exports.getCategories = (req, res) => {
  Category.findAll()
    .then(categories => {
  
      if (categories.length === 0) {
        return res.status(404).json({ msg: 'Não encontramos categorias' });
      }
      return res.status(200).json({ categories });
    })
    .catch(error => {
     
      res.status(500).json({ msg: 'Erro ao obter as categorias', details: error.message });
    });
};

exports.getCategoryBySlug = (req, res) => {
  const slug = req.params.slug;

  Category.findOne({
    where: { slug },
    include: [{ model: Post, as: "Posts" }]
  })
    .then(category => {
      if (!category) {
        return res.status(404).json({ msg: 'Categoria não encontrada' });
      }

      const articles = category.Posts.map(post => ({
        id: post.id,
        title: post.title,
        slug: post.slug,
        sinopse: post.sinopse, 
        text: post.text,
        imageUrl: post.imageUrl
      }));

      res.status(200).json({
        category: category.name,
        articles: articles
      });
    })
    .catch(error => {
      console.error('Erro ao obter a categoria:', error);
      return res.status(500).json({ msg: 'Erro ao obter a categoria', details: error.message });
    });
};

exports.updateCategoryById = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  const { id } = req.params;  
  const { name } = req.body;

  Category.update(
    {
      name,
    },
    { where: { id } }
  )
  .then(([updated]) => {
    if (updated) {
      res.status(200).json({ msg: 'Categoria atualizada com sucesso' });
    } else {
      res.status(404).json({ msg: 'Categoria não encontrada' });
    }

  })
  .catch(error => {
    console.error('Erro ', error);
    res.status(500).json({ error: 'Erro interno ao atualizar a categoria', details: error.message });
  });
};

exports.deleteCategoryById = (req, res) => {
  const { id } = req.params;

  Category.findByPk(id)
    .then(category => {
      if (!category) {
        return res.status(404).json({ error: 'Esta categoria não existe' });
      }

      category.destroy()
        .then(() => {
          res.status(204).json({ msg: 'Categoria apagada com sucesso' });
        })
        .catch(error => {
          console.error('Erro ', error);
          res.status(500).json({ error: 'Erro interno ao apagar a categoria', details: error.message });
        });
    })
    .catch(error => {
      console.error('Erro ', error);
      res.status(500).json({ error: 'Erro no servidor', details: error.message });
    });
};

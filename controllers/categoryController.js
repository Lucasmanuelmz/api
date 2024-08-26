const Category = require('../models/categoryModel');
const slugify = require('slugify');

exports.createCategory = (req, res) => {
 const { name, UserId } = req.body;
 console.log('Categoria recebida: ',name, UserId)

 Category.findOne({ where: { name: name } })

  .then(category => {

    if(!category) {
      console.log('Categoria criada: ',name)
      Category.create({
        name: name,
        slug: slugify(name), 
        userId: UserId,
      })

      .then(() => {
        console.log('Categoria criada com sucesso: ',name)
        res.status(201).json({msg: 'Categoria criado com sucesso'})
      })

      .catch(error => {
        console.log('Erro '+error)
        res.status(500).json({error: 'Erro interno ao criar a categoria'})
      })

    } else {
      res.status(409).json({error: 'Esta categoria ja existe'})
    }
  })

  .catch(error => {
  res.status(500).json({error: 'Erro no servidor ', details: error.message})
  }) 
};

exports.getCategories = (req, res) => {
  Category.findAll()

  .then(categories => {

    if(!categories) {
      return res.status(404).json({msg: 'Nao encontramos categorias'})
    }

    return res.status(200).json({categories})
  })

  .catch(error => {
    return res.status(500).json({msg: 'Erro ao obter as categorias', details: error.message})
  })
};

exports.getCategoryBySlug = (req, res) => {
  const slug = req.params.slug;

  Category.findOne({where: {slug: slug}})

  .then(category => {

    if(!category) {
      return res.status(404).json({msg: 'Nao encontramo a categoria'})
    }

    return res.status(200).json({category})
  })

  .catch(error => {
    return res.status(500).json({msg: 'Erro ao obter a categoria', details: error.message})
  })
};

exports.updateCategoryById = (req, res) => {
  const { id, name, UserId } = req.body;

  Category.update(
  {
    name: name,
    slug: slugify(name), 
    userId: UserId,
  }, 

{where: {id:id}})

.then(() => {

  res.status(201).json({msg: 'Categoria Atualizada com sucesso'})
})

.catch(error => {

  res.status(500).json({error: 'Erro interno ao atualizar a categoria'})
})
}

exports.deleteCategoryById = (req, res) => {
  const id = req.params.id;
 
  Category.findByPk(id)
 
   .then((category => {
     if(category) {
 
       Category.destroy()
 
       .then(() => {
         res.status(204).json({msg: 'Categoria apagado com sucesso'})
       })
 
       .catch(error => {
         
         res.status(500).json({error: 'Erro interno ao apagar a categoria'})
       })
 
     } else {
       res.status(409).json({error: 'Esta categoria nao existe'})
     }
   }))
 
   .catch(error => {
   res.status(500).json({error: 'Erro no servidor ', details: error.message})
   }) 
 };
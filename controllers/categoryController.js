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
}
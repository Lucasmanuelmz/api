const bcrypt = require('bcryptjs');
const User = require('../models/userModels');
const {validationResult} = require('express-validator');
require('dotenv').config();
const port = process.env.PORT || 3000;
const baseUrl = process.env.BASE_URL || `http://localhost:${port}`;

exports.createUser = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
   return res.status(400).json({errors: errors.array()})
  }
  const urlAvatar = req.file? `${baseUrl}/uploads/${req.file.filename}`: null;
  const { firstname, lastname, email, password } = req.body;

  User.findOne({ where: { email: email } })

    .then(user => {
      if (user) {
        console.log('Usuário já existe:', email);
        return res.status(409).json({ msg: "Este usuário já existe" });
      }

      return bcrypt.hash(password, 10);
    })

    .then(hashedPassword => {
      if (!hashedPassword) throw new Error('Falha ao gerar o hash da senha');
      
      return User.create({
        urlAvatar,
        firstname,
        lastname,
        email,
        password: hashedPassword,
      });
    })

    .then(() => {
      console.log('Usuário criado com sucesso:', email);
      return res.status(201).json({ msg: 'Usuário criado com sucesso' });
    })
    
    .catch(error => {
      console.error('Erro ao criar o usuário:', error.message);
      return res.status(500).json({ error: 'Erro ao criar o usuário', details: error.message });
    });
};

exports.getUsers = (req, res) => {
  User.findAll()

  .then(users => {

    if(!users) {
      return res.status(404).json({msg: 'Usuarios nao encontrados'})
    }

    return res.status(200).json({users})
  })

  .catch(error => {
    return res.status(500).json({msg: 'Erro ao obter os usuarios', details: error.message})
  })
};

exports.getUserById = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)

  .then(user => {

    if(!user) {
      return res.status(404).json({msg: 'Usuario nao encontrado'})
    }

    return res.status(200).json({user})
  })

  .catch(error => {
    return res.status(500).json({msg: 'Erro ao obter o usuario', details: error.message})
  })
}

exports.updateUserById = (req, res) => {
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json({errors: errors.array()})
  }
  const urlAvatar = req.file? `${baseUrl}/uploads/${req.file.filename}`: null;
  const { id, firstname, lastname, email, birthdate, phone, bio } = req.body;

  User.update({
    urlAvatar,
    firstname: firstname,
    lastname: lastname,
    email: email,
    birthdate: birthdate,
    phone: phone,
    bio: bio
  }, 
{ where: { id: id } })

.then(() => {
  return res.status(201).json({msg: 'Usuario atualizado com sucesso'})
}) 

.catch(error => {
  return res.status(500).json({msg: 'Erro ao atualizar o usuario'})
})
};

exports.deleteUserById = (req, res) => {
  const id = req.params.id;

  User.destroy({where: {id: id } })

.then(() => {
  return res.status(204).json({msg: 'Usuario destruido com sucesso'})
}) 

.catch(error => {
 return res.status(500).json({msg: 'Erro ao apagar o usuario'})
})
};


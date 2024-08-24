const bcrypt = require('bcryptjs');
const User = require('../models/userModels');

exports.createUser = (req, res) => {
  const { firstname, lastname, email, password } = req.body;
  console.log('Dados recebidos:', { firstname, lastname, email, password });

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
      
      console.log('Criando usuário com dados:', { firstname, lastname, email });
      return User.create({
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

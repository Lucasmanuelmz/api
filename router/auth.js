const { Router } = require('express');
const authRouter = Router()
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
require('dotenv').config()

authRouter.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.status(401).json({ msg: 'Falha na autenticação' });
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY,{ expiresIn: '1h' });

          return res.status(200).json({ token });

    })(req, res, next); });

module.exports = authRouter;


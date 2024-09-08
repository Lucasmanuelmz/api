const { Router } = require('express');
const authRouter = Router()
const passport = require('../config/passport');
const jwt = require('jsonwebtoken');
const validationLogin = require('../validators/validationLogin');
const { validationResult } = require('express-validator');
require('dotenv').config()

authRouter.post('/auth', 
    validationLogin, (req, res, next) => {
        const errors = validationResult(req);
        if(!errors.isEmpty()) {
            return res.status(400).json({errors: errors.array()})
        }
  passport.authenticate('local', (err, user, info) => {
      if (err) {
          return next(err);
      }
      if (!user) {
          return res.status(401).json({ msg: 'Falha na autenticação', info: info });
      }
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY || 'f1e7b9a2c4d8e5a7f8d92b6a34d9b7c84b9d7e3b6c9f8e2a...',{ expiresIn: '8h' });

          return res.status(201).json({ token });

    })(req, res, next); });

module.exports = authRouter;


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
      const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY,{ expiresIn: '8h' });

          return res.status(201).json({ token });

    })(req, res, next); });

module.exports = authRouter;


const passport = require('passport');
const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/userModels');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
require('dotenv').config();

passport.use(new LocalStrategy(
  { usernameField: 'email' },
  (email, password, done) => {
   
    User.findOne({ where: { email: email } })
    
      .then(user => { 
        
        if (!user) {
          return done(null, false, { message: 'Usuário não encontrado.' });
        }
        
        bcrypt.compare(password, user.password, (err, isMatch) => {
          
          if (err) throw err;
          if (isMatch) {
      
            return done(null, user);
          } else {
            return done(null, false, { message: 'Senha incorreta.' });
          }
        });
      
      })
      .catch(err => done(err));
  }
));

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.SECRET_KEY || 'f1e7b9a2c4d8e5a7f8d92b6a34d9b7c84b9d7e3b6c9f8e2a'
}

passport.use(new JwtStrategy(opts, (payload, done) => {
    User.findByPk(payload.id)

    .then(user => {

        if (user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    })

    .catch(error => {
      
      if (error) {
        return done(err, false);
    }});

}));

module.exports = passport;
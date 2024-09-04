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
  secretOrKey: process.env.SECRET_KEY
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
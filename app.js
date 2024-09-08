const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');

const userRouter = require('./router/userRouter');
const postRouter = require('./router/postRouter');
const categoryRouter = require('./router/categoryRouter');
const authRouter = require('./router/auth');
const commentRouter = require('./router/commentsRouter');
const currentUser = require('./middlewares/currentUser');
const passport = require('./config/passport');
const sequelize = require('./models/syncronization');

app.use(helmet({
  crossOriginResourcePolicy: { policy: "cross-origin" }, 
  crossOriginOpenerPolicy: { policy: "same-origin" }  
}));
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


app.use(cors());


app.get('/', (req, res) => {
  res.send('Correto');
});

app.use('/api/current-user', passport.authenticate('jwt', { session: false }), currentUser.currentUser);

app.use('/api', authRouter);
app.use('/api', userRouter);       
app.use('/api', postRouter);
app.use('/api/posts/:id', commentRouter);
app.use('/api', categoryRouter); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

module.exports = app;

const express = require('express');
const app = express();
const cors = require('cors');
const path = require('path');
const helmet = require('helmet');
require('dotenv').config()
const baseUrl = process.env.BASE_URL || 'http://localhost:3000'

const userRouter = require('./router/userRouter');
const postRouter = require('./router/postRouter');
const categoryRouter = require('./router/categoryRouter');
const authRouter = require('./router/auth');
const commentRouter = require('./router/commentsRouter');
const currentUser = require('./middlewares/currentUser');
const passport = require('./config/passport');
const sequelize = require('./models/syncronization');

app.use(helmet()); 
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.json()); 


app.use(cors({
  origin: baseUrl, 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));


app.get('/', (req, res) => {
  res.send('Correto');
});

app.use('/api/current-user', passport.authenticate('jwt', { session: false }), currentUser.currentUser);

app.use('/api', authRouter);
app.use('/api/users', userRouter);       
app.use('/api/posts', postRouter);
app.use('/api/posts/:id/comments', commentRouter);
app.use('/api/categories', categoryRouter); 

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo deu errado!');
});

module.exports = app;

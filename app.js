const express = require('express');
const app = express();

const userRouter = require('./router/userRouter');
const postRouter = require('./router/postRouter');
const categoryRouter = require('./router/categoryRouter');
const authRouter = require('./router/auth');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Correto');
});

app.use('/auth', authRouter);
app.use('/users', userRouter);       
app.use('/posts', postRouter);       
app.use('/categories', categoryRouter); 

module.exports = app;

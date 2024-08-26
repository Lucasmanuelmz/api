const express = require('express');
const app = express();

const userRouter = require('./router/userRouter');
const postRouter = require('./router/postRouter');
const categoryRouter = require('./router/categoryRouter');
const authRouter = require('./router/auth');
const commentRouter = require('./router/commentsRouter');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
  res.send('Correto');
});

app.use('/auth', authRouter);
app.use('/api', userRouter);       
app.use('/api', postRouter);
app.use('/api/posts/:id', commentRouter);       
app.use('api/posts', categoryRouter); 


module.exports = app;

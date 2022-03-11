const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./middleware/error-hander');
const auth = require('./middleware/auth');
const { loginUser, createUser } = require('./controllers/users');
const { validateUser, validateLogin } = require('./middleware/validation');
const NotFoundErr = require('./error/NotFoundErr');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mydb', () => {
  console.log('Connect to mydb');
});

app.post('/signin', validateLogin, loginUser);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use(errors());

app.use((req, res, next) => {
  next(new NotFoundErr('Страница по указанному маршруту не найдена'));
});

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');
const errorHandler = require('./middleware/error-hander');
const auth = require('./middleware/auth');
const { loginUser, createUser } = require('./controllers/users');
const { validateUser, validateLogin } = require('./middleware/validation');

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

app.use(errorHandler);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mydb');
  console.log('Connect to mydb');
  app.use(errors());
  app.use(errorHandler);
  await app.listen(PORT);
  console.log(`Сервер запущен на порту ${PORT}`);
}

main();

app.post('/signin', validateLogin, loginUser);
app.post('/signup', validateUser, createUser);

app.use(auth);

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

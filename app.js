const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/users');
const cardRouter = require('./routes/cards');

const { PORT = 3000 } = process.env;
const app = express();

app.use((req, res, next) => {
  req.user = {
    _id: '620bef5408601ce9de117f30',
  };
  next();
});

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mydb');
  console.log('Connect to mydb');

  await app.listen(PORT);
  console.log(`Сервер запущен на порту ${PORT}`);
}

main();

app.use('/users', userRouter);
app.use('/cards', cardRouter);
app.use((req, res) => {
  res.status(404).send({ message: 'Страница по указанному маршруту не найдена' });
});

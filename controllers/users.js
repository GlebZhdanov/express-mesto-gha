const User = require('../models/user');

module.exports.getUsers = async (req, res) => {
  try {
    const user = await User.find({});
    res.status(200).send(user);
  } catch (e) {
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

module.exports.getUsersById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.status(200).send(user);
    } else {
      res.status(404).send({ message: 'Пользователь не найден' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(400).send({ message: 'Ошибка валидации id' });
    } else {
      res.status(500).send({ message: 'Произошла ошибка' });
    }
  }
};

module.exports.postUsers = async (req, res) => {
  try {
    const { name, about, avatar } = req.body;
    const user = new User({ name, about, avatar });
    return res.status(201).send(await user.save());
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные пользователя' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

module.exports.patchUsers = async (req, res) => {
  try {
    const { name, about } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { name, about },
      { new: true, runValidators: true },
    );
     if (user) {
      return res.status(200).send(user);
    } if (!name || !about) {
      return res.status(400).send({ message: 'Поля "name" и "about" должно быть заполнены' });
    }
    return res.status(404).send({ message: 'Пользователь не найден' });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные пользователя' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

module.exports.patchUsersAvatar = async (req, res) => {
  try {
    const { avatar } = req.body;
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { avatar },
      { new: true, runValidators: true },
    );
    if (user) {
      return res.status(200).send(user);
    }
    if (!avatar) {
      return res.status(400).send({ message: 'Поле "avatar" должно быть заполнено' });
    }
    return res.status(404).send({ message: 'Пользователь не найден' });
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные пользователя' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

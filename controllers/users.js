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
      res.status(400).send({ message: 'Пользователь не найден' });
    }
  } catch (e) {
    if (e.name === 'CastError');
    res.status(500).send({ message: 'Ошибка валидации id' });
  }
};

module.exports.postUsers = async (req, res) => {
  try {
    const user = new User(req.body);
    return res.status(201).send(await user.save(req.body));
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(404).send({ message: 'Переданы некорректные данные пользователя' });
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
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(404).send({ message: 'Переданы некорректные данные пользователя' });
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
    return res.status(200).send(user);
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(404).send({ message: 'Переданы некорректные данные пользователя' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

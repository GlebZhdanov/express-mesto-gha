const Card = require('../models/card');

exports.getCards = async (req, res) => {
  try {
    const card = await Card.find({});
    res.status(200).send(card);
  } catch (e) {
    res.status(500).send({
      message: 'Ошибка по умолчанию',
    });
  }
};

exports.postCards = async (req, res) => {
  try {
    const {
      name, link,
    } = req.body;
    const owner = req.user._id;
    const card = new Card({
      name, link, owner,
    });
    return res.status(201).send(await card.save());
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(400).send({ message: 'Переданы некорректные данные карточки' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

exports.deleteCard = async (req, res) => {
  try {
    const card = await Card.findByIdAndDelete(req.params.id);
    if (card) {
      res.status(200).send(card);
    } else {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

exports.putCardLike = async (req, res) => {
  try {
    const likeCard = await Card.findByIdAndUpdate(
      req.params.id,
      { $addToSet: { likes: req.user._id } },
      { new: true },
    );
    if (likeCard) {
      res.status(200).send(likeCard);
    } else {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

exports.deleteCardLike = async (req, res) => {
  try {
    const dislikeCard = await Card.findByIdAndUpdate(
      req.params.id,
      { $pull: { likes: req.user._id } },
      { new: true },
    );
    if (dislikeCard) {
      res.status(200).send(dislikeCard);
    } else {
      res.status(404).send({ message: 'Карточка не найдена' });
    }
  } catch (e) {
    if (e.name === 'CastError') {
      res.status(400).send({ message: 'Невалидный id ' });
    }
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

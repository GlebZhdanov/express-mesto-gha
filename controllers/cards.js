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
      return res.status(200).send(card);
    }
    return res.status(404).send({ message: 'Карточка не найдена' });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Невалидный id ' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
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
      return res.status(200).send(likeCard);
    }
    return res.status(404).send({ message: 'Карточка не найдена' });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Невалидный id ' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
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
      return res.status(200).send(dislikeCard);
    }
    return res.status(404).send({ message: 'Карточка не найдена' });
  } catch (e) {
    if (e.name === 'CastError') {
      return res.status(400).send({ message: 'Невалидный id ' });
    }
    return res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

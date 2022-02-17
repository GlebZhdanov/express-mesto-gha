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
      name, link, likes, createdAt,
    } = req.body;
    const owner = req.user._id;
    const card = new Card({
      name, link, owner, likes, createdAt,
    });
    return res.status(201).send(await card.save(req.body));
  } catch (e) {
    if (e.name === 'ValidationError') {
      return res.status(404).send({ message: 'Переданы некорректные данные карточки' });
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
    res.status(500).send({ message: 'Ошибка по умолчанию' });
  }
};

exports.putCardLike = async (req, res) => {
  const likeCard = await Card.findByIdAndUpdate(
    req.params.id,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  );
  res.status(200).send(likeCard);
};

exports.deleteCardLike = async (req, res) => {
  const dislikeCard = await Card.findByIdAndUpdate(
    req.params.id,
    { $pull: { likes: req.user._id } },
    { new: true },
  );
  res.status(200).send(dislikeCard);
};

const express = require('express');
const {
  getCards,
  postCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

const router = express.Router();

router.get('/', getCards);

router.post('/', postCards);

router.delete('/:id', deleteCard);

router.put('/:id/likes', putCardLike);

router.delete('/:id/likes', deleteCardLike);

module.exports = router;

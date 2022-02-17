const express = require('express');
const {
  getCards,
  postCards,
  deleteCard,
  putCardLike,
  deleteCardLike,
} = require('../controllers/cards');

const router = express.Router();
const app = express();

app.use(express.json());

router.get('/', getCards);

router.post('/', express.json(), postCards);

router.delete('/:id', deleteCard);

router.put('/:id/likes', putCardLike);

router.delete('/:id/likes', deleteCardLike);

module.exports = router;

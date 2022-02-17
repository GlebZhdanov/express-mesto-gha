const express = require('express');
const {
  getUsers,
  postUsers,
  getUsersById,
  patchUsers,
  patchUsersAvatar,
} = require('../controllers/users');

const router = express.Router();
const app = express();

app.use(express.json());

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.post('/', express.json(), postUsers);

router.patch('/me', express.json(), patchUsers);

router.patch('/me/avatar', express.json(), patchUsersAvatar);

module.exports = router;

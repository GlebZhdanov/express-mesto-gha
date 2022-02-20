const express = require('express');
const {
  getUsers,
  postUsers,
  getUsersById,
  patchUsers,
  patchUsersAvatar,
} = require('../controllers/users');

const router = express.Router();

router.get('/', getUsers);

router.get('/:id', getUsersById);

router.post('/', postUsers);

router.patch('/me', patchUsers);

router.patch('/me/avatar', patchUsersAvatar);

module.exports = router;

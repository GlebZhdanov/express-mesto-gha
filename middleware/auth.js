const jwt = require('jsonwebtoken');
const UnAuthtorizeErr = require('../error/UnAuthtorizeErr');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    throw new UnAuthtorizeErr('Ошибка авторизации');
  }

  req.user = payload;

  next();
  return null;
};

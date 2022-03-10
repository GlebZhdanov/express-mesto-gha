const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  let payload;

  try {
    payload = jwt.verify(token, 'secret');
  } catch (err) {
    return res.status(403).send({ message: 'Нет доступа' });
  }

  req.user = payload;

  next();
  return null;
};

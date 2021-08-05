// прослойка для того что бы определить зарегестрировался ли пользователь и достаем токен
const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = (req, res, next) => {
  if (req.method === "OPTIONS") {
    return next();
  }

  try {
    // получаем токен
    const token = req.headers.authorization.split(" ")[1]; // "Bearer TOKEN"
    if (!token) {
      return res.status(401).json({ message: "Нет авторизации" });
    }

    // Раскодируем токен
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    req.user = decoded;
    next();
  } catch (err) {
    res.status(401).json({ message: "Нет авторизации" });
  }
};

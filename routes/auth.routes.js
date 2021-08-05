// Роуты для нашего сайта
const { Router } = require("express");
const router = Router();

// JWT token
const jwt = require("jsonwebtoken");
const config = require("config");

// Подключение модели юсера
const User = require("../models/User");

// Для валидации данных
const { check, validationResult } = require("express-validator");

// Для шифровки паролей
const bcrypt = require("bcryptjs");

// обработка post запроса /api/auth/register
router.post(
  `/register`,

  // валидация данных
  [
    check("email", "Некорректный email").isEmail(),
    check("password", "Минимальная длинна пароля 6 символов").isLength({
      min: 6,
    }),
  ],

  async (req, res) => {
    try {
      // Проверка на валидность данных
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данные при регистрации",
        });
      }

      // Получаем пароль и емайл и пытаемся зарегестрировать пользователя
      const { email, password } = req.body;

      // Проверяем есть ли такой юсер у нас
      const candidate = await User.findOne({ email });
      if (candidate) {
        return res
          .status(400)
          .json({ message: "Такой пользователь уже существует" });
      }

      // Хэшируем пароли
      const hashedPassword = await bcrypt.hash(password, 12);

      // Создаем пользователя
      const user = new User({ email, password: hashedPassword });
      await user.save();

      res.status(201).json({ message: "Пользователь создан" });
    } catch (err) {
      // Стандартная ошибка если что то пошло не так
      res
        .status(500)
        .json({ message: `Что то пошло не так, попробуйте снова` });
    }
  }
);

// обработка post запроса /api/auth/login
router.post(
  `/login`,
  // валидация данных
  [
    check("email", "Введите корректныё email").normalizeEmail().isEmail(),
    check("password", "Введите корректный пароль").exists(),
  ],

  async (req, res) => {
    try {
      // Проверка на валидность данных
      const errors = validationResult(req);
      if (!errors.isEmpty) {
        return res.status(400).json({
          errors: errors.array(),
          message: "Некорректные данных при входе в систему",
        });
      }
      // Проверка есть ли такой юсер
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ message: "Пользователь не найден" });
      }
      // Проверка захешированного пароль в базе даннхых
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Пароль не верный" });
      }
      //jwt token
      const token = jwt.sign({ userID: user.id }, config.get("jwtSecret"), {
        expiresIn: "1h",
      });
      res.json({ token, userId: user.id });
    } catch (err) {
      // Стандартная ошибка если что то пошло не так
      res
        .status(500)
        .json({ message: `Что то пошло не так, попробуйте снова` });
    }
  }
);

// Експортируем в модули наши роутеры
module.exports = router;

const config = require("config");
const Link = require("../models/Link");
// middleware
const auth = require("../middleweare/auth.middleware");

const { Router } = require("express");
// модуль для сокрашение ссылок
const shortid = require("shortid");

const router = Router();

// /api/auth/generate
router.post("/generate", auth, async (req, res) => {
  try {
    const baseUrl = config.get("baseUrl");

    // ссылка от куда пришел пользователь
    const { from } = req.body;

    // сокрашаем ссылку
    const code = shortid.generate();

    // проверяем если такая ссылка в бд
    const existing = await Link.findOne({ from });
    if (existing) {
      return res.json({ link: existing });
    }

    // создаем новую ссылку
    const to = baseUrl + "/t/" + code;
    const link = new Link({
      code,
      to,
      from,
      owner: req.user.userId,
    });

    await link.save();
    res.status(201).json({ link });
  } catch (err) {
    // Стандартная ошибка если что то пошло не так
    console.log("THIS IS STOP");
    res.status(500).json({ message: `Что то пошло не так, попробуйте снова` });
  }
});

// отправка данных на get запрос на все линки
router.get("/", auth, async (req, res) => {
  try {
    // получаем линки пользователя после того как он прошел middleware
    const links = await Link.find({ onwer: req.user.userId });
    res.json(links);
  } catch (err) {
    // Стандартная ошибка если что то пошло не так
    res.status(500).json({ message: `Что то пошло не так, попробуйте снова` });
  }
});

// отправка запроса на определенный линк
router.get("/:id", auth, async (req, res) => {
  try {
    const link = await Link.findById(req.params.id); //??
    res.json(link);
  } catch (err) {
    // Стандартная ошибка если что то пошло не так
    res.status(500).json({ message: `Что то пошло не так, попробуйте снова` });
  }
});

module.exports = router;

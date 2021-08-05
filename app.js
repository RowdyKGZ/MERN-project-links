const express = require("express");
const config = require("config");
const mongoose = require("mongoose");
const path = require("path");

// инициализация сервера express
const app = express();

// мидлвеар для нормального парсинга body
app.use(express.json({ extended: true }));

// Обработка запросов с фронта
app.use("/api/auth", require("./routes/auth.routes"));
app.use("/api/link", require("./routes/link.routes"));
// обработка сокрашенной ссылки
app.use("/t", require("./routes/redirect.routes"));

// для удаленного сервера что бы на нем разворачивать фронтенд
if (process.env.NODE_ENV === "production") {
  app.use("/", express.static(path.join(__dirname, "client", "build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Берем порт с default.json
const PORT = config.get("port") || 5000;

async function start() {
  // Пробуем подключиться к базе данных mongoDB
  try {
    await mongoose.connect(config.get("mongoUri"), {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
    });

    // Создаем локальный сервер на 5000 порту
    app.listen(PORT, () => {
      console.log(`has been started on port ${PORT}`);
    });
  } catch (e) {
    console.log(`server error ${e.message}`);
    process.exit(1);
  }
}

start();

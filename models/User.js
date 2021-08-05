// Моделька нашего юсера
const { Schema, model, Types } = require("mongoose");

const schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  //Обьединение атрибута линк у пользователя с моделью Link
  links: [{ type: Types.ObjectId, ref: "Link" }],
});

// Експортируем в модули нашу модель юсера
module.exports = model("User", schema);

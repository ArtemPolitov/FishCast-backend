import mongoose from "mongoose";

// Создание схемы для региона
const regionSchema = new mongoose.Schema({
  name: { type: String, required: true },
  name_uk: { type: String, required: true },
  name_en: { type: String, required: true },
  id: { type: Number, required: true },
});

// Создаем модель на основе схемы
const Region = mongoose.model("Region", regionSchema);

export default Region;

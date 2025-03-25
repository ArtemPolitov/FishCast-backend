import express from "express";
import Fish from "../models/Fish.js"; // Импортируем модель рыбы

const router = express.Router();

// Получение данных всех рыб
router.get("/", async (req, res) => {
  try {
    const fishes = await Fish.find(); // Получаем все записи о рыбах из базы данных
    res.status(200).json(fishes); // Отправляем список рыб
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения данных рыб", error });
  }
});

// Получение данных конкретной рыбы по ID
router.get("/:id", async (req, res) => {
  const { id } = req.params; // Получаем id рыбы из параметров запроса
  try {
    const fish = await Fish.findOne({ id }); // Ищем рыбу по id в базе данных
    if (!fish) {
      return res.status(404).json({ message: "Рыба не найдена" }); // Если рыба не найдена
    }
    res.status(200).json(fish); // Отправляем данные конкретной рыбы
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения данных рыбы", error });
  }
});

export default router;

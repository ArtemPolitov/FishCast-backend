import express from "express";
import mongoose from "mongoose";
import City from "../models/City.js";

const router = express.Router();

// Получить все города
router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении данных", error: err.message });
  }
});

// Получить город по id
router.get("/:id", async (req, res) => {
  try {
    // Используем кастомное поле id для поиска
    const city = await City.findOne({ id: req.params.id });

    if (!city) {
      return res.status(404).json({ message: "Город не найден" });
    }
    res.json(city);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении города", error: err });
  }
});

// Добавить новый город
router.post("/", async (req, res) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.status(201).json(newCity);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при добавлении города", error: err.message });
  }
});

// Получить города по region_id
router.get("/by-region/:regionId", async (req, res) => {
  try {
    // Проверка на валидность regionId
    if (!req.params.regionId) {
      return res.status(400).json({ message: "Неверный формат regionId" });
    }

    // Ищем города по region_id (используем user-defined id, а не _id)
    const cities = await City.find({ region_id: req.params.regionId }); 

    if (cities.length === 0) {
      return res.status(404).json({ message: "Города для данной области не найдены" });
    }
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении данных по области", error: err.message });
  }
});

export default router;

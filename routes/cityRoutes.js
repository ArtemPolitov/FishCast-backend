import express from "express";
import City from "../models/City.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const cities = await City.find();
    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении данных", error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
   
    const city = await City.findOne({ id: req.params.id });

    if (!city) {
      return res.status(404).json({ message: "Город не найден" });
    }
    res.json(city);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении города", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const newCity = new City(req.body);
    await newCity.save();
    res.status(201).json(newCity);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при добавлении города", error: err.message });
  }
});

router.get("/by-region/:regionId", async (req, res) => {
  try {
    const { regionId } = req.params;

    if (!regionId) {
      return res.status(400).json({ message: "Неверный формат regionId" });
    }

    const cities = await City.find({ region_id: regionId });

    if (!cities.length) {
      return res.status(404).json({ message: "Города для данной области не найдены" });
    }

    res.json(cities);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении данных по области", error: err.message });
  }
}); 

export default router;

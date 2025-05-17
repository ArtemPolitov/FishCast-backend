import express from "express";
import Region from "../models/Region.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const regions = await Region.find();
    res.json(regions);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении данных", error: err });
  }
}); 

router.get("/:id", async (req, res) => {
  try {
    // Ищем регион по полю id, а не по _id
    const region = await Region.findOne({ id: req.params.id });

    if (!region) {
      return res.status(404).json({ message: "Регион не найден" });
    }

    res.json(region);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при получении региона", error: err });
  }
});

router.post("/", async (req, res) => {
  try {
    const newRegion = new Region(req.body);
    await newRegion.save();
    res.status(201).json(newRegion);
  } catch (err) {
    res.status(500).json({ message: "Ошибка при добавлении региона", error: err });
  }
});

export default router;

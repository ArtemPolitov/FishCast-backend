import express from "express";
import Location from "../models/Location.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const locations = await Location.find();
    res.status(200).json(locations); 
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения данных локаций", error });
  }
});


router.get("/id/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const location = await Location.findOne({ _id: id });
    if (!location) {
      return res.status(404).json({ message: "Локация не найдена" });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения данных локации", error });
  }
});

router.get("/slug/:slug", async (req, res) => {
  const { slug } = req.params;
  try {
    const location = await Location.findOne({ slug: slug });
    if (!location) {
      return res.status(404).json({ message: "Локация не найдена" });
    }
    res.status(200).json(location);
  } catch (error) {
    res.status(500).json({ message: "Ошибка получения данных локации", error });
  }
});

export default router;

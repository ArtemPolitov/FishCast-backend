  import express from "express";
  import Fish from "../models/Fish.js"; 

  const router = express.Router();

  router.get("/", async (req, res) => {
    try {
      const fishes = await Fish.find(); 
      res.status(200).json(fishes); 
    } catch (error) {
      res.status(500).json({ message: "Ошибка получения данных рыб", error });
    }
  });

  router.get("/:id", async (req, res) => {
    const { id } = req.params; 
    try {
      const fish = await Fish.findOne({ id });
      if (!fish) {
        return res.status(404).json({ message: "Рыба не найдена" }); 
      }
      res.status(200).json(fish); 
    } catch (error) {
      res.status(500).json({ message: "Ошибка получения данных рыбы", error });
    }
  });

  export default router;

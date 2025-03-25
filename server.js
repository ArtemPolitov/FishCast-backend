import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cityRoutes from "./routes/cityRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import fishRoutes from "./routes/fishRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());
app.use(cors());

// Подключение к MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB подключена"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

// Указание абсолютного пути для папки uploads
const __dirname = path.resolve();  // Убедитесь, что __dirname правильно определяется
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Подключение маршрутов
app.use("/api/cities", cityRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api/fishes", fishRoutes);

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});

import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import cityRoutes from "./routes/cityRoutes.js";
import regionRoutes from "./routes/regionRoutes.js";
import fishRoutes from "./routes/fishRoutes.js";
import locationRoutes from "./routes/locationRoutes.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

//CORS
const allowedOrigins = [
  "http://localhost:3000",
  "http://192.168.50.249:3000",
];
app.use(cors({
  origin: allowedOrigins,
  credentials: true,
}));

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB подключена"))
  .catch((err) => console.error("Ошибка подключения к MongoDB:", err));

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.use("/api/cities", cityRoutes);
app.use("/api/regions", regionRoutes);
app.use("/api/fishes", fishRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/users", userRoutes);

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Сервер запущен:`);
  console.log(`- Local:   http://localhost:${PORT}`);
  console.log(`- Network: http://192.168.50.249:${PORT}`);
});

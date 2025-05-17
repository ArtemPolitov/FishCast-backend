import express from "express";
import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { authMiddleware } from "../middlewares/authMiddleware.js"; 

const router = express.Router();

  router.post("/register", async (req, res) => {
    const { name, email, password, regionId, cityId } = req.body;

    try {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: "Пользователь с таким email уже существует" });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        regionId,
        cityId,
        password: hashedPassword,
        favoriteLocations: [],
      });

      await newUser.save();

      res.status(201).json({ message: "Пользователь зарегистрирован успешно!" });
    } catch (error) {
      res.status(500).json({ message: "Ошибка при регистрации", error });
    }
  });

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Пользователь не найден" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Неверный пароль" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: "Ошибка при авторизации", error });
  }
});

router.get("/me", authMiddleware, async (req, res) => {
  const userId = req.user.id;

  try {
    const user = await User.findById(userId)
      .select('-password') 
      .populate("favoriteLocations");
      
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Ошибка при получении данных пользователя", error });
  }
});


router.post("/favorite/:locationId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { locationId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {  
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    if (!user.favoriteLocations.includes(locationId)) {
      user.favoriteLocations.push(locationId);
      await user.save();
      res.status(200).json({ message: "Локация добавлена в избранное" });
    } else {
      res.status(400).json({ message: "Локация уже в избранном" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при добавлении локации", error });
  }
});

router.delete("/favorite/:locationId", authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const { locationId } = req.params;

  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "Пользователь не найден" });
    }

    const index = user.favoriteLocations.indexOf(locationId);
    if (index !== -1) {
      user.favoriteLocations.splice(index, 1);
      await user.save();
      res.status(200).json({ message: "Локация удалена из избранного" });
    } else {
      res.status(400).json({ message: "Локация не найдена в избранном" });
    }
  } catch (error) {
    res.status(500).json({ message: "Ошибка при удалении локации", error });
  }
});

export default router;

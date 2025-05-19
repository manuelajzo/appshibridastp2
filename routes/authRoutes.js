import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
    const {name, username, email, password} = req.body;

    if (!username || !password) return res.status(400).json({ error: "Faltan campos obligatorios" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({name, username, email, password: hashedPassword});

    try {
        await newUser.save();
        res.status(201).json({ message: "Usuario registrado con éxito" });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post("/login", async (req, res) => {
    const {username, password } = req.body;
  
    const user = await User.findOne({username});
    if (!user) return res.status(404).json({error: "Usuario no encontrado"});
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Contraseña incorrecta"});
  
    const token = jwt.sign(
      {userId: user._id, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );
  
    res.json({token});
});

export default router;
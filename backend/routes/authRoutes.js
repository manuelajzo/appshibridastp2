import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/userModel.js';
import dotenv from 'dotenv';
dotenv.config();

const router = express.Router();

router.post('/register', async (req, res) => {
  const { name, username, email, password } = req.body;

  if (!name || !username || !email || !password) {
    return res.status(400).json({ error: "Every field is mandatory" });
  }

  try {
    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      username,
      email,
      password: hashedPassword
    });

    await newUser.save();
    res.status(201).json({ message: "User created successfully" });

  } catch (error) {
    console.error("Register failed:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/login", async (req, res) => {
    const {username, password } = req.body;
  
    const user = await User.findOne({username});
    if (!user) return res.status(404).json({error: "User not found"});
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect password" });
  
    const token = jwt.sign(
      {userId: user._id, username: user.username},
      process.env.JWT_SECRET,
      {expiresIn: "1h"}
    );
  
    res.json({token});
});

export default router;
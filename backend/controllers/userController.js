import userModel from "../models/userModel";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;

export const registerUser = async (req, res) => {
    const { name, username, email, password } = req.body;

    try {
        // Check if user already exists
        const existingUser = await userModel.findOne({
            $or: [{ username }, { email }]
        });
        if (existingUser) {
            return res.status(400).json({ message: "Username or email already exists" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new userModel({
            name,
            username,
            email,
            password: hashedPassword
        });

        await newUser.save();

        res.status(201).json({
            message: "User registered successfully"});
    } catch (error) {
        console.error("Error registering user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await userModel.find({ username });
        if (!user || user.length === 0) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const isPasswordValid = await bcrypt.compare(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Invalid username or password" });
        }
        const token = jwt.sign(
            {
                id: user[0]._id,
                username: user[0].username,
                email: user[0].email
            },
            JWT_SECRET,
            { expiresIn: "3d" }
        );

        res.json({
            message: "Login successful",
            user: {
                _id: user[0]._id,
                username: user[0].username,
                email: user[0].email
            },
            jwToken: token
        });
    } catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

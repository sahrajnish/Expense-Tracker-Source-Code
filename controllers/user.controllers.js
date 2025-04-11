const User = require('../models/user.models.js');

// User login callback
const handleUserLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Email and password are required."
            })
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }

        const isValidPassword = await user.isPasswordCorrect(password);
        if (!isValidPassword) {
            return res.status(401).json({
                success: false,
                message: "Password incorrect"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Login successful",
            user: {
                id: user._id,
                email: user.email,
                name: user.name,
            }
        });
    } catch (error) {
        console.log("Error from User Login:", error)
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
};

// User register callback
const handleRegisterUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Name, email, and password are required"
            })
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(401).json({
                success: false,
                message: "Email is already registered"
            })
        }

        const newUser = await User.create({ name, email, password });
        return res.status(201).json({
            success: true,
            message: "User registered successfully",
            user: {
                id: newUser._id
            }
        });
    } catch (error) {
        console.error("Register Error:", error);

        return res.status(statusCode).json({
            success: false,
            message: error.message
        });
    }
};

const handleLogout = async (req, res) => {
    
};

module.exports = {
    handleUserLogin,
    handleRegisterUser,
    handleLogout
};
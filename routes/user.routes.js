const express = require("express");
const { handleUserLogin, handleRegisterUser, handleLogout, refreshAccessToken } = require("../controllers/user.controllers");

// router
const router = express.Router();

// Login User route
router.post('/login', handleUserLogin);

// Register User route
router.post('/register', handleRegisterUser);

// Logout route
router.get('/logout', handleLogout);

// export
module.exports = router;
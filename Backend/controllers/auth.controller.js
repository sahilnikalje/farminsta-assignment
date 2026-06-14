const authService = require("../services/auth.service");

const register = async (req, res, next) => {
  try {
    await authService.registerUser(req.body);
    res.status(201).json({ success: true, message: "User registered successfully" });
  } 
  catch (error) {
    if (error.message === "Email is already registered") {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const result = await authService.loginUser(req.body);
    res.status(200).json({
      success: true,
      message: "Login successful",
      accessToken: result.accessToken,
      refreshToken: result.refreshToken,
      user: result.user,
    });
  } 
  catch (error) {
    if (error.message === "Invalid email or password") {
      return res.status(401).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const refresh = async (req, res, next) => {
  try {
    const token = req.body.refreshToken || req.cookies.refreshToken;
    if (!token) {
      return res.status(400).json({ success: false, message: "Refresh token is required" });
    }

    const result = await authService.refreshAccessToken(token);
    res.status(200).json({ success: true, message: "Token refreshed", accessToken: result.accessToken });
  } 
  catch (error) {
    return res.status(401).json({ success: false, message: error.message });
  }
};

const logout = async (req, res, next) => {
  try {
    const token = req.body.refreshToken || req.cookies.refreshToken;
    if (!token) {
      return res.status(400).json({ success: false, message: "Refresh token is required" });
    }

    await authService.logoutUser(token);
    res.status(200).json({ success: true, message: "Logged out successfully" });
  }
   catch (error) {
    return res.status(400).json({ success: false, message: error.message });
  }
};

module.exports = { register, login, refresh, logout };
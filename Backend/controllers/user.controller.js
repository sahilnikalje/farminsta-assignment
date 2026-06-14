const userService = require("../services/user.service");

const getProfile = async (req, res, next) => {
  try {
    const user = await userService.getUserProfile(req.user.userId);
    res.status(200).json({ success: true, message: "Profile fetched successfully", data: user });
  } 
  catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const updated = await userService.updateUserProfile(req.user.userId, req.body);
    res.status(200).json({ success: true, message: "Profile updated successfully", data: updated });
  }
   catch (error) {
    if (error.message === "Email is already in use" || error.message === "User not found") {
      return res.status(400).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json({ success: true, message: "Users fetched successfully", data: users });
  }
   catch (error) {
    next(error);
  }
};

const changeUserRole = async (req, res, next) => {
  try {
    const updated = await userService.changeUserRole(req.params.id, req.body);
    res.status(200).json({ success: true, message: "User role updated successfully", data: updated });
  } 
  catch (error) {
    if (error.message === "User not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};

module.exports = { getProfile, updateProfile, getAllUsers, changeUserRole };
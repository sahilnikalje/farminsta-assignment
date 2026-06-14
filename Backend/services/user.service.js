const { User } = require("../models/user.model");

const getUserProfile = async (userId) => {
  const user = await User.findById(userId).select("-password -refreshToken");
  if (!user) throw new Error("User not found");
  return user;
};

const updateUserProfile = async (userId, data) => {
  // Prevent email collision with another existing account
  if (data.email) {
    const existing = await User.findOne({ email: data.email });
    if (existing && existing._id.toString() !== userId) {
      throw new Error("Email is already in use");
    }
  }

  const updated = await User.findByIdAndUpdate(userId, data, { new: true }).select(
    "-password -refreshToken"
  );
  if (!updated) throw new Error("User not found");
  return updated;
};

const getAllUsers = async () => {
  return await User.find().select("-password -refreshToken");
};

const changeUserRole = async (targetId, data) => {
  const user = await User.findByIdAndUpdate(
    targetId,
    { role: data.role },
    { new: true }
  ).select("-password -refreshToken");

  if (!user) throw new Error("User not found");
  return user;
};

module.exports = { getUserProfile, updateUserProfile, getAllUsers, changeUserRole };
const { Project } = require("../models/project.model");

const getAllProjects = async () => {
  return await Project.find().populate("owner", "name email role");
};

const createProject = async (data, ownerId) => {
  return await Project.create({ ...data, owner: ownerId });
};

const updateProject = async (projectId, data, userId, userRole) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");

  //! Managers are restricted to their own projects only
  if (userRole === "MANAGER" && project.owner.toString() !== userId) {
    throw new Error("Access denied: you can only update your own projects");
  }

  return await Project.findByIdAndUpdate(projectId, data, { new: true });
};

const deleteProject = async (projectId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new Error("Project not found");
  await Project.findByIdAndDelete(projectId);
};

module.exports = { getAllProjects, createProject, updateProject, deleteProject };
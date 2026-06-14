const projectService = require("../services/project.service");

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects();
    res.status(200).json({ success: true, message: "Projects fetched successfully", data: projects });
  }
   catch (error) {
    next(error);
  }
};

const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(req.body, req.user.userId);
    res.status(201).json({ success: true, message: "Project created successfully", data: project });
  } 
  catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const updated = await projectService.updateProject(
      req.params.id,
      req.body,
      req.user.userId,
      req.user.role
    );
    res.status(200).json({ success: true, message: "Project updated successfully", data: updated });
  } 
  catch (error) {
    if (error.message === "Project not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    if (error.message.startsWith("Access denied")) {
      return res.status(403).json({ success: false, message: error.message });
    }
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    await projectService.deleteProject(req.params.id);
    res.status(200).json({ success: true, message: "Project deleted successfully" });
  }
   catch (error) {
    if (error.message === "Project not found") {
      return res.status(404).json({ success: false, message: error.message });
    }
    next(error);
  }
};

module.exports = { getAllProjects, createProject, updateProject, deleteProject };
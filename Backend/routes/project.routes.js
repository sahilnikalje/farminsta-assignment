const express = require("express");
const { getAllProjects, createProject, updateProject, deleteProject } = require("../controllers/project.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { createProjectSchema, updateProjectSchema } = require("../validators/project.validator");

const router = express.Router();

router.use(authenticate);

router.get("/", getAllProjects);
router.post("/", authorize("MANAGER", "ADMIN"), validate(createProjectSchema), createProject);
router.put("/:id", authorize("MANAGER", "ADMIN"), validate(updateProjectSchema), updateProject);
router.delete("/:id", authorize("ADMIN"), deleteProject);

module.exports = router;
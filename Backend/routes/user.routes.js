const express = require("express");
const { getProfile, updateProfile, getAllUsers, changeUserRole } = require("../controllers/user.controller");
const { authenticate } = require("../middlewares/auth.middleware");
const { authorize } = require("../middlewares/role.middleware");
const { validate } = require("../middlewares/validate.middleware");
const { updateProfileSchema, updateRoleSchema } = require("../validators/user.validator");

const router = express.Router();

router.use(authenticate);

router.get("/profile", getProfile);
router.patch("/profile", validate(updateProfileSchema), updateProfile);
router.get("/", authorize("ADMIN"), getAllUsers);
router.patch("/:id/role", authorize("ADMIN"), validate(updateRoleSchema), changeUserRole);

module.exports = router;
const { z } = require("zod");

const updateProfileSchema = z.object({
  name: z.string().min(2).max(50).optional(),
  email: z.string().email("Invalid email address").optional(),
});

const updateRoleSchema = z.object({
  role: z.enum(["USER", "MANAGER", "ADMIN"], {
    errorMap: () => ({ message: "Role must be USER, MANAGER, or ADMIN" }),
  }),
});

module.exports = { updateProfileSchema, updateRoleSchema };
const { z } = require("zod");

const createProjectSchema = z.object({
  title: z.string().min(2, "Title must be at least 2 characters").max(100),
  description: z.string().max(500).optional(),
});

const updateProjectSchema = z.object({
  title: z.string().min(2).max(100).optional(),
  description: z.string().max(500).optional(),
});

module.exports = { createProjectSchema, updateProjectSchema };
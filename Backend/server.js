require("dotenv").config();

const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");

const { connectDB } = require("./config/db");
const { swaggerDocs } = require("./config/swagger");
const { errorMiddleware } = require("./middlewares/error.middleware");

const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const projectRoutes = require("./routes/project.routes");

const app = express()
const PORT = process.env.PORT

app.use(helmet());
app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/projects", projectRoutes);

swaggerDocs(app);

app.get("/", (_req, res) => {
  res.json({ success: true, message: "Project Management API is running" });
});

app.use(errorMiddleware);

const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();
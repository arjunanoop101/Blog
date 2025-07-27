import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { connectDB } from "./config/connectDB.js";

dotenv.config();
connectDB();

const app = express();

//middleware
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

// routes
app.get("/", (req, res) => {
  res.send("Hello from server");
});
import adminRoutes from "./routes/admin.route.js";
import blogRoutes from "./routes/blog.route.js";
app.use("/api/admin", adminRoutes);
app.use("/api/blog", blogRoutes);
app.use(express.urlencoded({ extended: true }));

const PORT = process.env.PORT || 3000;

//server listening
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;

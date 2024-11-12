import express from "express";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { connectDB } from "./Library/db.js";
import AuthUser from "./routes/AuthUser.js";
import BlogsPart from "./routes/BlogsPart.js";
const app = express();
config();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", AuthUser);
app.use("/api/blog", BlogsPart);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  connectDB();
  console.log(`Server running on port:${PORT}`);
});

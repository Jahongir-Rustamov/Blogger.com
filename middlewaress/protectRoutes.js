import jwt from "jsonwebtoken";
import { config } from "dotenv";
import UserModel from "../models/user.js";
config();
async function protectRoute(req, res, next) {
  try {
    const token = req.cookies["my_blog"];
    if (!token) {
      return res.status(401).json({ message: "No Token Provider" });
    }

    const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
    if (!decode) {
      return res.status(401).json({ message: "Invalid Token" });
    }
    const user = await UserModel.findById(decode.UserId).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not Found ⚠️" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error with protectRoute Middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
}

export { protectRoute };

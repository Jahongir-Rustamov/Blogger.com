import express from "express";
import {
  authCheck,
  Login,
  LogOut,
  SignUp,
} from "../controllers/auth.controller.js";
import { protectRoute } from "../middlewaress/protectRoutes.js";

const router = express.Router();

router.post("/signup", SignUp);

router.post("/login", Login);

router.delete("/logout", LogOut);

router.get("/authcheck", protectRoute, authCheck);

export default router;

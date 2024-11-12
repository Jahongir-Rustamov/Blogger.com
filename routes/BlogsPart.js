import express from "express";
import { protectRoute } from "../middlewaress/protectRoutes.js";
import {
  CreateBlog,
  DeleteBlog,
  GetAllBlogs,
  GetMyBlogs,
  ReadMore,
  UpdateAllData,
} from "../controllers/Blog.controller.js";

const router = express.Router();

router.get("/getAllBlog", GetAllBlogs);

router.post("/create", protectRoute, CreateBlog);

router.get("/readmore/:id", ReadMore);

router.get("/myBlogs", protectRoute, GetMyBlogs);

router.put("/update/:id", protectRoute, UpdateAllData);

router.delete("/:id", protectRoute, DeleteBlog);

export default router;

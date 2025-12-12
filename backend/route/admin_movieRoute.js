import {
  addMovie,
  deleteMovie,
  updateMovie,
} from "../controller/admin_movie.controller.js";
import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import adminMiddleware from "../middleware/admin.middleware.js";

const router = express.Router();

router.post("/addmovie", authMiddleware, adminMiddleware, addMovie);

router.put("/updatemovie/:id", authMiddleware, adminMiddleware, updateMovie);

router.delete("/deletemovie/:id", authMiddleware, adminMiddleware, deleteMovie);

export default router;

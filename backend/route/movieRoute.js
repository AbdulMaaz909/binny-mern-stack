import express from "express";
import authMiddleware from "../middleware/auth.middleware.js";
import {
  getMovies,
  getSortedMovies,
  searchMovie,
} from "../controller/movie.controller.js";

const router = express.Router();

router.get("/movies", getMovies);

router.get("/movies/sorted", getSortedMovies);

router.get("/movies/search", authMiddleware, searchMovie);

export default router;

import Movie from "../model/movie.model.js";

const addMovie = async (req, res) => {
  try {
    if (Array.isArray(req.body)) {
      for (let movie of req.body) {
        const { title, description, rating, releaseDate, duration } = movie;
        if (!title || !description || !rating || !releaseDate || !duration) {
          return res.status(400).json({
            success: false,
            message: "All fields are required for each movie!",
          });
        }
      }

      const movies = await Movie.insertMany(req.body);

      return res.status(200).json({
        success: true,
        message: "Multiple movies added successfully!",
        movies,
      });
    }

    const { title, description, rating, releaseDate, duration } = req.body;

    if (!title || !description || !rating || !releaseDate || !duration) {
      return res.status(400).json({
        success: false,
        message: "All fields are required!",
      });
    }

    const newMovie = await Movie.create({
      title,
      description,
      rating,
      releaseDate,
      duration,
    });

    return res.status(200).json({
      success: true,
      message: "Movie added successfully!",
      movie: newMovie,
    });

  } catch (error) {
    console.error(error);
    return res.status(400).json({
      success: false,
      message: error.message || "Error while adding movie!",
    });
  }
};


const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const updateData = req.body;

    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(400)
        .json({ success: false, message: "Movie not found" });
    }

    const updateMovie = await Movie.findByIdAndUpdate(movieId, updateData, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      message: "Movie updated successfully",
      movie: updateMovie,
    });
  } catch (error) {
    console.error("Update Movie Error:", error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};

const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;

    // check if movie exists
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res
        .status(400)
        .json({ success: false, message: "Movie not found!" });
    }
    await Movie.findByIdAndDelete(movieId);

    res.status(200).json({
      success: true,
      message: "Movie deleted successfully!",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Internal server error",
      error: error.message,
    });
  }
};
export { addMovie, updateMovie, deleteMovie };

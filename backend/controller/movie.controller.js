import Movie from "../model/movie.model.js";

const getMovies = async (req, res) => {
  try {
    //Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    //fetch Movies
    const movies = await Movie.find().skip(skip).limit(limit);

    //total count for frontend pagination
    const totalMovies = await Movie.countDocuments();

    res.status(200).json({
      success: true,
      page,
      totalPages: Math.ceil(totalMovies / limit),
      totalMovies,
      movies,
    });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .json({ message: error.message || "Error while Fetching Movies" });
  }
};

const getSortedMovies = async (req, res) => {
  try {
    const allowedSortFields = ["title", "rating", "releaseDate", "duration"];

    const {
      sortBy = "rating",
      order = "desc",
      page: pageQurey = "1",
      limit: limitQurery = "10",
    } = req.query;

    //parse page and limit safety
    const page = Math.max(1, parseInt(pageQurey, 10) || 1);
    const limit = Math.max(1, Math.min(100, parseInt(limitQurery, 10) || 10));
    const skip = (page - 1) * limit;

    const field = allowedSortFields.includes(sortBy) ? sortBy : "rating";
    const direction = order === "asc" ? 1 : -1;

    //build sorted object for mongoose
    const sortObj = { [field]: direction };

    // Adjust projection as needed: here we return common movie fields + timestamps
    const projection = {

      title: 1,
      description: 1,
      rating: 1,
      releaseDate: 1,
      duration: 1,
      posterUrl: 1,
      createdAt: 1,
    };

    const [movies, totalMovies] = await Promise.all([
      Movie.find()
        .sort(sortObj)
        .skip(skip)
        .limit(limit)
        .select(projection)
        .lean(),
      Movie.countDocuments(),
    ]);

    return res.status(200).json({
      success: true,
      page,
      limit,
      totalPages: Math.ceil(totalMovies / limit),
      totalMovies,
      sortBy: field,
      order: direction === 1 ? "asc" : "desc",
      movies,
    });
  } catch (error) {
    console.error("getSortedMovies error:", error);
    res.status(400).json({
      success: false,
      message: error.message || "Error while Sorting movie!",
    });
  }
};

const searchMovie = async (req, res) => {
  try {
    const { query } = req.query;
    if (!query || query.trim() === "") {
      return res
        .status(404)
        .json({ success: false, message: "Please provide a search query" });
    }
    const movies = await Movie.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    });
    res.status(200).json({ success: true, total: movies.length, movies });
  } catch (error) {
    console.error(error);
    res.status(501).json({ success: false, message: "Server Error!" });
  }
};

export { getMovies, getSortedMovies, searchMovie };

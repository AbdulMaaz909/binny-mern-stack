import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  CircularProgress,
  Pagination,
  TextField,
  MenuItem,
  Avatar,
  Menu,
  Divider,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { getMovie, sortedMovie, searchMovie } from "../../../service";
import auth from "../../../utils/auth";
import LogoutIcon from "@mui/icons-material/Logout";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import "./Dashboard.css";

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [query, setQuery] = useState("");
  const [sortBy, setSortBy] = useState("");
  const [order, setOrder] = useState("asc");

  const user = auth.getUser() || {};
  const name = user.name || "User";
  const email = user.email || "";

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (e) => setAnchorEl(e.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const logoutUser = () => {
    auth.logout();
    window.location.href = "/";
  };

  const fetchMovies = async () => {
    try {
      let res;

      if (query.trim() !== "") {
        res = await searchMovie(query);
        setMovies(res.data.movies || []);
        setTotalPages(1);
      } else if (sortBy !== "") {
        res = await sortedMovie(sortBy, order);
        setMovies(res.data.movies || []);
        setTotalPages(res.data.totalPages || 1);
      } else {
        res = await getMovie(page, 10);
        setMovies(res.data.movies || []);
        setTotalPages(res.data.totalPages || 1);
      }
    } catch (err) {
      toast.error("Failed to load movies");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, [page,
     sortBy, 
     order, 
     query]);

  return (
    <Box className="dashboard-container">
      {/* HEADER */}
      <Box className="header">
        <Box className="profile-section" onClick={handleOpenMenu}>
          <Avatar className="profile-avatar">
            {name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography className="profile-name">{name}</Typography>
            <Typography className="profile-email">{email}</Typography>
          </Box>
          <KeyboardArrowDownIcon className="dropdown-icon" />
        </Box>

        {/* PROFILE DROPDOWN MENU */}
        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography>{name}</Typography>
            <Typography fontSize={12} color="gray">
              {email}
            </Typography>
          </Box>

          <Divider />

          <MenuItem onClick={logoutUser}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Box>

      <Paper className="paperBox">
        <Typography variant="h5" className="title">
          🎬 Movie Dashboard
        </Typography>

        {/* Filters */}
        <Box className="filterBox">
          <TextField
            label="Search Movies..."
            variant="outlined"
            size="small"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="searchInput"
          />

          <TextField
            select
            label="Sort By"
            size="small"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="sortInput"
          >
            <MenuItem value="">None</MenuItem>
            <MenuItem value="title">Name</MenuItem>
            <MenuItem value="rating">Rating</MenuItem>
            <MenuItem value="releaseDate">Release Date</MenuItem>
            <MenuItem value="duration">Duration</MenuItem>
          </TextField>

          <TextField
            select
            label="Order"
            size="small"
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="orderInput"
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </TextField>
        </Box>

        {loading ? (
          <Box className="loadingBox">
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3}>
              {movies.map((movie) => (
                <Grid item xs={12} sm={6} md={4} key={movie._id}>
                  <Paper className="movieCard">
                    <Typography variant="h6" className="movieTitle">
                      {movie.title || "No Title"}
                    </Typography>

                    <Typography className="movieDetails">
                      ⭐ Rating: {movie.rating}
                    </Typography>
                    <Typography className="movieDetails">
                      📅 Release: {movie.releaseDate?.substring(0, 10)}
                    </Typography>
                    <Typography className="movieDetails">
                      ⏳ Duration: {movie.duration} mins
                    </Typography>
                  </Paper>
                </Grid>
              ))}
            </Grid>

            {sortBy === "" && query === "" && (
              <Box className="paginationBox">
                <Pagination
                  count={totalPages}
                  page={page}
                  onChange={(e, value) => setPage(value)}
                  color="primary"
                />
              </Box>
            )}
          </>
        )}
      </Paper>
    </Box>
  );
};

export default Dashboard;

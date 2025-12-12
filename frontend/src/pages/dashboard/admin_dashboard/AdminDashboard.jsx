import { useEffect, useState } from "react";
import {
  Box,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Avatar,
  Menu,
  MenuItem,
  Divider,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import LogoutIcon from "@mui/icons-material/Logout";

import { toast } from "react-hot-toast";
import { addMovie, updateMovie, deleteMovie, getMovie } from "../../../service";

import "./AdminDashboard.css";

export default function AdminMovies() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    rating: "",
    releaseDate: "",
    duration: "",
  });

  const [editId, setEditId] = useState(null);

  // ✅ Get user from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;

  const name = user?.name || "User";
  const role = user?.role || "Admin";
  const email = user?.email || "example@gmail.com";

  // Profile dropdown menu
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    window.location.href = "/";
  };

  // Fetch movies
  const fetchMovies = async () => {
    try {
      const res = await getMovie(1, 50);
      setMovies(res.data.movies || []);
    } catch (err) {
      toast.error("Failed to load movies");
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  // Change form data
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit form
  const handleSubmit = async () => {
    try {
      if (editId) {
        await updateMovie(formData, editId);
        toast.success("Movie updated successfully");
      } else {
        await addMovie(formData);
        toast.success("Movie added successfully");
      }
      setFormData({ title: "", description: "", rating: "", releaseDate: "", duration: "" });
      setEditId(null);
      fetchMovies();
    } catch (err) {
      toast.error("Operation failed");
      console.log(err);
    }
  };

  // Edit
  const handleEdit = (movie) => {
    setEditId(movie._id);
    setFormData({
      title: movie.title,
      description: movie.description,
      rating: movie.rating,
      releaseDate: movie.releaseDate?.substring(0, 10),
      duration: movie.duration,
    });
  };

  // 🔥 Delete confirmation dialog state
  const [deleteId, setDeleteId] = useState(null);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);

  const openDeletePopup = (id) => {
    setDeleteId(id);
    setOpenDeleteDialog(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteMovie(deleteId);
      toast.success("Movie deleted");
      fetchMovies();
    } catch (err) {
      toast.error("Failed to delete movie");
      console.log(err);
    } finally {
      setOpenDeleteDialog(false);
      setDeleteId(null);
    }
  };

  return (
    <Box className="admin-wrapper">

      {/* HEADER WITH PROFILE */}
      <Box className="admin-header">
        <Typography variant="h5" className="admin-title">
          🎬 Admin Movie Management
        </Typography>

        <Box className="profile-section" onClick={handleOpenMenu}>
          <Avatar className="profile-avatar">
            {name?.charAt(0)?.toUpperCase()}
          </Avatar>
          <Box>
            <Typography className="profile-name">{name}-{role}</Typography>
            <Typography className="profile-email">{email}</Typography>
          </Box>
          <KeyboardArrowDownIcon className="dropdown-icon" />
        </Box>

        <Menu anchorEl={anchorEl} open={open} onClose={handleCloseMenu}>
          <Box sx={{ px: 2, py: 1 }}>
            <Typography>{name}</Typography>
            <Typography fontSize={12} color="gray">{email}</Typography>
          </Box>

          <Divider />

          <MenuItem onClick={logoutUser}>
            <LogoutIcon fontSize="small" sx={{ mr: 1 }} /> Logout
          </MenuItem>
        </Menu>
      </Box>

      <Paper className="admin-container">

        {/* FORM SECTION */}
        <Box className="form-box">
          <Typography variant="h6" className="form-title">
            {editId ? "✏️ Edit Movie" : "➕ Add New Movie"}
          </Typography>

          <TextField label="Title" name="title" value={formData.title} onChange={handleChange} fullWidth size="small" />
          <TextField label="Description" name="description" value={formData.description} onChange={handleChange} fullWidth size="small" />

          <Box className="row">
            <TextField label="Rating" name="rating" type="number" value={formData.rating} onChange={handleChange} size="small" />
            <TextField label="Duration (mins)" name="duration" type="number" value={formData.duration} onChange={handleChange} size="small" />
            <TextField label="Release Date" name="releaseDate" type="date" value={formData.releaseDate} onChange={handleChange} size="small" InputLabelProps={{ shrink: true }} />
          </Box>

          <Button variant="contained" onClick={handleSubmit} className="submit-btn">
            {editId ? "Update Movie" : "Add Movie"}
          </Button>
        </Box>

        {/* MOVIE LIST */}
        {loading ? (
          <Box className="loading"><CircularProgress /></Box>
        ) : (
          <Grid container spacing={2} className="movie-grid">
            {movies.map((movie) => (
              <Grid item xs={12} sm={6} md={4} key={movie._id}>
                <Paper className="movie-card">
                  <Typography variant="h6" className="movie-title">{movie.title}</Typography>
                  <Typography>⭐ Rating: {movie.rating}</Typography>
                  <Typography>📅 Release: {movie.releaseDate?.substring(0, 10)}</Typography>
                  <Typography>⏳ Duration: {movie.duration} mins</Typography>

                  <Box className="card-actions">
                    <Button variant="outlined" size="small" onClick={() => handleEdit(movie)}>Edit</Button>
                    <Button variant="contained" size="small" color="error" onClick={() => openDeletePopup(movie._id)}>Delete</Button>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        )}
      </Paper>

      {/* DELETE CONFIRMATION POPUP */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Delete Movie?</DialogTitle>

        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this movie? This action cannot be undone.
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button color="error" onClick={confirmDelete} autoFocus>Delete</Button>
        </DialogActions>
      </Dialog>

    </Box>
  );
}

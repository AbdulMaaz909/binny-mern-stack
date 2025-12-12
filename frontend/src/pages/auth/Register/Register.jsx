import { yupResolver } from "@hookform/resolvers/yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { Container } from "../../../components";
import { checkUserRegister } from "../../../service"; 
import "./Register.css";

const validationSchema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Email must be valid").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
    role: yup.string().required("Role is require"),
});

const Register = () => {
  const navigate = useNavigate();

  // Password visibility toggles
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const body = {
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role,
      };

      const res = await checkUserRegister(body);
      console.log(res);      

      toast.success("Registration successful!");

      reset();

      // Redirect to login page
      setTimeout(() => navigate("/login"), 1000);
    } catch (error) {
      const message =
        error?.response?.data?.message ||
        "Something went wrong. Please try again.";

      toast.error(message);
    }
  };

  return (
    <div className="Register">
      <Container>
        <Paper elevation={3}>
          <Box px={3} py={2}>
            <Typography variant="h6" align="center" mb={2}>
              Create Account
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* Name */}
                <TextField
                  fullWidth
                  label="Name"
                  margin="dense"
                  {...register("name")}
                  error={!!errors.name}
                  helperText={errors.name?.message}
                />

                {/* Email */}
                <TextField
                  fullWidth
                  label="Email"
                  margin="dense"
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />

                <TextField
                  fullWidth
                  label="Role"
                  margin="dense"
                  placeholder="user/admin"
                  {...register("role")}
                  error={!!errors.role}
                  helperText={errors.role?.message}
                />

                {/* Password */}
                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  margin="dense"
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />

                {/* Confirm Password */}
                <TextField
                  fullWidth
                  label="Confirm Password"
                  type={showConfirm ? "text" : "password"}
                  margin="dense"
                  {...register("confirmPassword")}
                  error={!!errors.confirmPassword}
                  helperText={errors.confirmPassword?.message}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={() => setShowConfirm(!showConfirm)}
                          edge="end"
                        >
                          {showConfirm ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
            </Grid>

            {/* Submit Button */}
            <Box mt={2}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Register
              </Button>
            
             <Box textAlign="center">
              <Typography variant="body2">
                Already have an account?{" "}
                <span
                  onClick={() => navigate("/login")}
                  style={{
                    color: "#1976d2",
                    cursor: "pointer",
                    fontWeight: "bold",
                    textDecoration: "underline",
                  }}
                >
                  Login
                </span>
              </Typography>
            </Box>
            </Box>
          </Box>
        </Paper>
      </Container>
    </div>
  );
};

export default Register;

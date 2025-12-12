import * as yup from "yup";
import "./Login.css";
import { Container } from "../../../components";

import {
  Paper,
  Box,
  Typography,
  Grid,
  TextField,
  InputAdornment,
  IconButton,
  Button,
} from "@mui/material";

import { Visibility, VisibilityOff } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import { checkUserLogin } from "../../../service";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  email: yup
    .string()
    .email("Email must be valid")
    .required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {
    try {
      const res = await checkUserLogin(data);

      toast.success("Login Successful!");

      // Save token
      localStorage.setItem("token", res.data.token);

      // Save user role (optional but useful)
      const role = res.data.user.role;
      localStorage.setItem("user", JSON.stringify(res.data.user));

      // Redirect based on role
      if (role === "admin") {
        navigate("/admindashboard");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast.error(error?.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="Login">
      <Container>
        <Paper>
          <Box px={3} py={2}>
            <Typography variant="h6" align="center" margin="dense">
              Login
            </Typography>
            <Grid container spacing={1}>
              <Grid item width={"100%"}>
                <TextField
                  required
                  id="email"
                  name="email"
                  label="Email"
                  fullWidth
                  margin="dense"
                  {...register("email")}
                  error={!!errors.email}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.email?.message}
                </Typography>

                <TextField
                  required
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  fullWidth
                  margin="dense"
                  {...register("password")}
                  error={!!errors.password}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label={
                            showPassword ? "hide password" : "show password"
                          }
                          onClick={handleClickShowPassword}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <Typography variant="inherit" color="textSecondary">
                  {errors.password?.message}
                </Typography>
              </Grid>
            </Grid>

            <Box mt={1}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={handleSubmit(onSubmit)}
              >
                Login
              </Button>
            
             <Box textAlign="center">
  <Typography variant="body2">
    Don't have an account?{" "}
    <span
      onClick={() => navigate("/register")}
      className="register-link"
    >
      Register here
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

export default Login;

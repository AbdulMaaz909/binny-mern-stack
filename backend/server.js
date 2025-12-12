import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import authRouter from "./route/authRoute.js";
import moviesRouter from "./route/movieRoute.js";
import adminRouter from "./route/admin_movieRoute.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use(cors());

//authRouters (Login & Register)
app.use("/api/auth", authRouter);

//movie routers
app.use("/api/movie", moviesRouter);

//admin routers
app.use("/api/movie", adminRouter); //addmovie , upadteMovie

app.listen(process.env.PORT, () => {
  console.log(`server is running on`, process.env.PORT);
});

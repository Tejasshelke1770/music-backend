import express from "express";
import cookieParser from "cookie-parser";
import authRoutes from "./routes/auth.route.js";
import musicRoutes from "./routes/music.routes.js";
import albumRoutes from "./routes/album.routes.js";

const app = express();

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/music", musicRoutes);
app.use("/api/album", albumRoutes);

export default app;

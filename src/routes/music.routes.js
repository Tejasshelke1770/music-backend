import express from "express";
import multer from "multer";
import { createMusic, listMusics } from "../controllers/music.controller.js";
import { authArtist, authUser } from "../middlewares/auth.middleware.js";

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get("/", authUser, listMusics);
router.post("/upload", authArtist, upload.single("music"), createMusic);

export default router;

import expresss from "express";
import { authArtist, authUser } from "../middlewares/auth.middleware.js";
import { createAlbum, getAlbum, listAllAlbums } from "../controllers/album.controller.js";

const router = expresss.Router();

router.get("/", authUser, listAllAlbums);
router.get("/:albumid", authUser, getAlbum);
router.post("/", authArtist, createAlbum);

export default router;

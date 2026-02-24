import albumModel from "../models/album.model.js";


export const createAlbum = async (req, res) => {
  const { title, musics } = req.body;

  const album = await albumModel.create({
    title,
    musics: musics,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "album created successfully",
    album: {
      id: album._id,
      title: album.title,
      musics: album.musics,
      artist: album.artist,
    },
  });
};

export const listAllAlbums = async (req, res) => {
  const albums = await albumModel
    .find({})
    .select("title artist")
    .populate("artist", "username");

  res.status(200).json({
    message: "Success",
    albums: albums,
  });
};

export const getAlbum = async (req, res) => {
  const { albumid } = req.params;

  const album = await albumModel
    .findById(albumid)
    .populate("musics", "uri title")
    .populate("artist", "username");

  return res.status(200).json({
    message: "success",
    album: album,
  });
};

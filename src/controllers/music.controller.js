import uploadFile from "../services/storage.service.js";
import musicModel from "../models/music.model.js";

export const listMusics = async (req, res) => {
  const musics = await musicModel
    .find({})
    .populate("artist", "username email ");

  res.status(200).json({
    message: "success",
    musics: musics,
  });
};

export const createMusic = async (req, res) => {
  const file = req.file;
  const { title } = req.body;

  const result = await uploadFile(file.buffer, title);

  const music = await musicModel.create({
    uri: result.url,
    title: title,
    artist: req.user.id,
  });

  res.status(201).json({
    message: "Music created Successfully!",
    music: {
      id: music._id,
      uri: music.uri,
      title: music.title,
      artist: music.artist,
    },
  });
};


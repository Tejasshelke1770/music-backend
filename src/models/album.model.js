import mongoose from "mongoose";

const albumSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  musics: [
    {
      type: mongoose.Types.ObjectId,
      ref: "music",
    },
  ],
  artist: {
    type: mongoose.Types.ObjectId,
    ref: "user",
    required: true,
  },
});

const albumModel = mongoose.model("album", albumSchema);
export default albumModel;
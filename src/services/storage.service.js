import ImageKit from "@imagekit/nodejs";

const imageKit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

const uploadFile = async (buffer, filename) => {
  const result = await imageKit.files.upload({
    file: buffer.toString("base64"),
    fileName: filename,
    folder: "spotifyBackend",
  });
  return result;
};

export default uploadFile;
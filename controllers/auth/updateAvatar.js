const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;

const { requestError } = require("../../utils");
const updateUser = require("./updateUser");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

async function resize(tempUpload) {
  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).writeAsync(tempUpload);
}

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await resize(tempUpload);

  const extention = path.extname(originalname);
  const filename = `${id}${extention}`;

  const resultUpload = path.join(avatarsDir, filename);
  const avatarURL = path.join("avatars", filename);

  await fs.rename(tempUpload, resultUpload);

  const result = await updateUser(id, { avatarURL });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;

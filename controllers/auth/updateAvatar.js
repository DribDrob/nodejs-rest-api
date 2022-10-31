const Jimp = require("jimp");
const path = require("path");
const fs = require("fs").promises;

const { User } = require("../../models/user");
const { requestError } = require("../../utils");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

async function updateUserAvatar(userId, body) {
  return await User.findByIdAndUpdate(userId, body, { new: true });
}
async function resize(tempUpload) {
  const image = await Jimp.read(tempUpload);
  await image.resize(250, 250).writeAsync(tempUpload);
}

const updateAvatar = async (req, res) => {
  const { _id: id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  await resize(tempUpload);

  // 1st
  //   const extention = originalname.split(".").pop();
  //   const filename = `${id}.${extention}`;

  // 2nd
  const extention = path.extname(originalname);
  const filename = `${id}${extention}`;

  const resultUpload = path.join(avatarsDir, filename);
  const avatarURL = path.join("avatars", filename);

  await fs.rename(tempUpload, resultUpload);

  const result = await updateUserAvatar(id, { avatarURL });
  if (!result) {
    throw requestError(404, "Not found");
  }
  res.status(200).json({ avatarURL });
};

module.exports = updateAvatar;

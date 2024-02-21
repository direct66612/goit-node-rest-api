const multer = require("multer");

const path = require("path");

class UploadAvatarProcess {
  static initUploadImageMiddleware(name) {
    const multerStorage = multer.diskStorage({
      destination: path.resolve("tmp"),
      filename: (req, file, cbk) => {
        cbk(null, file.originalname);
      },
    });

    return multer({
      storage: multerStorage,
    }).single(name);
  }
}
const uploadAvatar = UploadAvatarProcess.initUploadImageMiddleware("avatar");

module.exports = { uploadAvatar };

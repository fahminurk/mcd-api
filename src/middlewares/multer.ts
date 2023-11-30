import multer from "multer";
import { nanoid } from "nanoid";
export const fileUploader = ({
  destinationFolder = "",
  prefix = "POST",
  fileType = "image",
}) => {
  const storageConfig = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, `${__dirname}/../public/${destinationFolder}`);
    },

    filename: (req, file, cb) => {
      const fileExtension = file.mimetype.split("/")[1];

      const filename = `${prefix}_${nanoid()}.${fileExtension}`;
      cb(null, filename);
    },
  });
  const uploader = multer({
    storage: storageConfig,

    fileFilter: (req, file, cb) => {
      if (file.mimetype.split("/")[0] != fileType) {
        return cb(null, false);
      }

      cb(null, true);
    },
  });
  return uploader;
};

export const upload = multer({
  limits: {
    fileSize: 10000000, //byte
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.split("/")[0] != "image") {
      return cb(null, false);
    }
    cb(null, true);
  },
});

module.exports = { fileUploader, upload };

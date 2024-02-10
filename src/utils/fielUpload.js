import multer from "multer";
import { v4 as uuidv4 } from "uuid";

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "uploads");
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + "-" + uuidv4() + "-" + file.originalname);
//   },
// });

// export const upload = multer({ storage }).single("path");

export const fileUpload = (fieldname) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + uuidv4() + "-" + file.originalname);
    },
  });

  return multer({ storage }).single(fieldname);
  // return upload.single(fieldname);
};

export const filesUpload = (fieldname) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "-" + uuidv4() + "-" + file.originalname);
    },
  });

  return multer({ storage }).array(fieldname);
  // return upload.single(fieldname);
};

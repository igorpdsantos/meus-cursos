import multer from "multer";
import { extname, resolve } from "path";

/* global __dirname */

const aleatorio = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/png" && file.mimetype !== "image/jpeg") {
      return cb(new multer.MulterError("Arquivo precisa ser PNG ou JPG."));
    }

    return cb(null, true);
  },
  limits: {
    fileSize: 2 * 1024 * 1024, // 2 MB: trava para não encher o disco.
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cb) => {
      // Nome único: dois envios do mesmo "foto.png" não se sobrescrevem, e o
      // nome original do cliente nunca vira caminho no disco.
      cb(null, `${Date.now()}_${aleatorio()}${extname(file.originalname)}`);
    },
  }),
};

import multer from "multer";
import { unlink } from "fs/promises";
import { resolve } from "path";

import multerConfig from "../configs/multerConfig.js";
import Foto from "../models/Foto.js";
import Aluno from "../models/Aluno.js";
import User from "../models/User.js";

/* global __dirname */

const upload = multer(multerConfig).single("foto");

const CAMPOS_PUBLICOS = ["id", "originalname", "filename", "url", "aluno_id", "user_id", "created_at"];

function mensagemDoMulter(e) {
  if (e.code === "LIMIT_FILE_SIZE") return "Arquivo maior que 2 MB.";
  return e.code || e.message || "Falha no envio do arquivo.";
}

async function apagarDoDisco(filename) {
  try {
    await unlink(resolve(__dirname, "..", "..", "uploads", filename));
  } catch {
    // Arquivo já não estava lá: o registro no banco some do mesmo jeito.
  }
}

class FotoController {
  // GET /fotos
  async index(req, res) {
    const fotos = await Foto.findAll({ attributes: CAMPOS_PUBLICOS, order: [["id", "ASC"]] });
    return res.json(fotos);
  }

  // GET /fotos/:id
  async show(req, res) {
    const foto = await Foto.findByPk(req.params.id, { attributes: CAMPOS_PUBLICOS });

    if (!foto) {
      return res.status(404).json({ errors: ["Foto não existe."] });
    }

    return res.json(foto);
  }

  // POST /fotos — multipart/form-data com o arquivo em "foto" e um dos donos
  // (aluno_id ou user_id) como campo de texto.
  store(req, res) {
    return upload(req, res, async (erroUpload) => {
      if (erroUpload) {
        return res.status(400).json({ errors: [mensagemDoMulter(erroUpload)] });
      }

      if (!req.file) {
        return res.status(400).json({ errors: ["Envie o arquivo no campo 'foto'."] });
      }

      const { originalname, filename } = req.file;
      const aluno_id = req.body.aluno_id ? Number(req.body.aluno_id) : null;
      const user_id = req.body.user_id ? Number(req.body.user_id) : null;

      try {
        // O dono precisa existir antes de gravar: sem isso o FK estoura com um
        // erro de banco cru, difícil de ler.
        if (aluno_id && !(await Aluno.findByPk(aluno_id))) {
          throw new Error("Aluno não existe.");
        }

        if (user_id && !(await User.findByPk(user_id))) {
          throw new Error("Usuário não existe.");
        }

        const foto = await Foto.create({ originalname, filename, aluno_id, user_id });
        return res.status(201).json(foto);
      } catch (e) {
        // Deu errado depois do arquivo já estar no disco: apaga, senão sobra
        // um órfão que ninguém referencia.
        await apagarDoDisco(filename);
        const errors = e.errors ? e.errors.map((err) => err.message) : [e.message];
        return res.status(400).json({ errors });
      }
    });
  }

  // DELETE /fotos/:id — tira do banco e do disco
  async delete(req, res) {
    const foto = await Foto.findByPk(req.params.id);

    if (!foto) {
      return res.status(404).json({ errors: ["Foto não existe."] });
    }

    await apagarDoDisco(foto.filename);
    await foto.destroy();

    return res.json({ apagado: true, id: Number(req.params.id) });
  }
}

export default new FotoController();

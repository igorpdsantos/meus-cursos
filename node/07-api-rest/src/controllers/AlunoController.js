import Aluno from "../models/Aluno.js";
import Foto from "../models/Foto.js";

const CAMPOS_PUBLICOS = ["id", "nome", "sobrenome", "email", "idade", "peso", "altura"];
const CAMPOS_ACEITOS = ["nome", "sobrenome", "email", "idade", "peso", "altura"];

function filtrarEntrada(body) {
  return CAMPOS_ACEITOS.reduce((acc, campo) => {
    if (body[campo] !== undefined) acc[campo] = body[campo];
    return acc;
  }, {});
}

function erros(e) {
  if (e.errors) return e.errors.map((err) => err.message);
  return [e.message];
}

class AlunoController {
  // GET /alunos
  async index(req, res) {
    const alunos = await Aluno.findAll({
      attributes: CAMPOS_PUBLICOS,
      include: { model: Foto, as: "fotos", attributes: ["id", "filename", "url"] },
      order: [["id", "ASC"]],
    });

    return res.json(alunos);
  }

  // GET /alunos/:id
  async show(req, res) {
    const aluno = await Aluno.findByPk(req.params.id, {
      attributes: CAMPOS_PUBLICOS,
      include: { model: Foto, as: "fotos", attributes: ["id", "filename", "url"] },
    });

    if (!aluno) {
      return res.status(404).json({ errors: ["Aluno não existe."] });
    }

    return res.json(aluno);
  }

  // POST /alunos
  async store(req, res) {
    try {
      const aluno = await Aluno.create(filtrarEntrada(req.body));
      return res.status(201).json(aluno);
    } catch (e) {
      return res.status(400).json({ errors: erros(e) });
    }
  }

  // PUT /alunos/:id — o corpo precisa trazer o aluno inteiro
  async update(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(404).json({ errors: ["Aluno não existe."] });
      }

      const dados = filtrarEntrada(req.body);
      const faltando = CAMPOS_ACEITOS.filter((campo) => dados[campo] === undefined);

      if (faltando.length) {
        return res.status(400).json({
          errors: faltando.map((campo) => `PUT exige o campo ${campo}. Use PATCH para atualizar só uma parte.`),
        });
      }

      return res.json(await aluno.update(dados));
    } catch (e) {
      return res.status(400).json({ errors: erros(e) });
    }
  }

  // PATCH /alunos/:id — só o que veio no corpo
  async patch(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(404).json({ errors: ["Aluno não existe."] });
      }

      const dados = filtrarEntrada(req.body);

      if (!Object.keys(dados).length) {
        return res.status(400).json({ errors: ["Envie ao menos um campo para atualizar."] });
      }

      return res.json(await aluno.update(dados));
    } catch (e) {
      return res.status(400).json({ errors: erros(e) });
    }
  }

  // DELETE /alunos/:id
  async delete(req, res) {
    try {
      const aluno = await Aluno.findByPk(req.params.id);

      if (!aluno) {
        return res.status(404).json({ errors: ["Aluno não existe."] });
      }

      await aluno.destroy();
      return res.json({ apagado: true, id: Number(req.params.id) });
    } catch (e) {
      return res.status(400).json({ errors: erros(e) });
    }
  }
}

export default new AlunoController();

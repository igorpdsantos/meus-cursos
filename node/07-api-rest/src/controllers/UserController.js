import User from "../models/User.js";
import Foto from "../models/Foto.js";

// Trava de segurança: a resposta é montada a partir desta lista, não do objeto
// que veio do banco. password_hash nunca escapa, mesmo se alguém adicionar
// colunas novas no model depois.
const CAMPOS_PUBLICOS = ["id", "nome", "email", "created_at", "updated_at"];

// Segunda trava, na entrada: só estes campos são aceitos do corpo do pedido.
// Impede mass assignment — mandar {"id": 1} ou {"password_hash": "..."} no JSON
// não muda nada.
const CAMPOS_ACEITOS = ["nome", "email", "password"];

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

class UserController {
  // GET /users — lista todos
  async index(req, res) {
    const users = await User.findAll({
      attributes: CAMPOS_PUBLICOS,
      include: { model: Foto, as: "fotos", attributes: ["id", "filename", "url"] },
      order: [["id", "ASC"]],
    });

    return res.json(users);
  }

  // GET /users/:id — mostra um
  async show(req, res) {
    const { id } = req.params;

    const user = await User.findByPk(id, {
      attributes: CAMPOS_PUBLICOS,
      include: { model: Foto, as: "fotos", attributes: ["id", "filename", "url"] },
    });

    if (!user) {
      return res.status(404).json({ errors: ["Usuário não existe."] });
    }

    return res.json(user);
  }

  // POST /users — cria (rota aberta: é o cadastro)
  async store(req, res) {
    try {
      const { id, nome, email } = await User.create(filtrarEntrada(req.body));
      return res.status(201).json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({ errors: erros(e) });
    }
  }

  // PUT /users — troca todos os campos do usuário logado
  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ["Usuário não existe."] });
      }

      const dados = filtrarEntrada(req.body);

      // PUT substitui o recurso inteiro: o que não veio no corpo é obrigatório
      // mesmo assim. É essa exigência que separa PUT de PATCH.
      const faltando = ["nome", "email"].filter((campo) => dados[campo] === undefined);

      if (faltando.length) {
        return res.status(400).json({
          errors: faltando.map((campo) => `PUT exige o campo ${campo}. Use PATCH para atualizar só uma parte.`),
        });
      }

      const { id, nome, email } = await user.update(dados);
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({ errors: erros(e) });
    }
  }

  // PATCH /users — troca só os campos enviados do usuário logado
  async patch(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ["Usuário não existe."] });
      }

      const dados = filtrarEntrada(req.body);

      if (!Object.keys(dados).length) {
        return res.status(400).json({ errors: ["Envie ao menos um campo para atualizar."] });
      }

      const { id, nome, email } = await user.update(dados);
      return res.json({ id, nome, email });
    } catch (e) {
      return res.status(400).json({ errors: erros(e) });
    }
  }

  // DELETE /users — apaga o usuário logado
  async delete(req, res) {
    try {
      const user = await User.findByPk(req.userId);

      if (!user) {
        return res.status(404).json({ errors: ["Usuário não existe."] });
      }

      await user.destroy();
      return res.json({ apagado: true, id: Number(req.userId) });
    } catch (e) {
      return res.status(400).json({ errors: erros(e) });
    }
  }
}

export default new UserController();

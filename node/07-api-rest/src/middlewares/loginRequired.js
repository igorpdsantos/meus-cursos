import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* global process */

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ errors: ["Login obrigatório."] });
  }

  const [, token] = authorization.split(" ");

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    // O token ser válido não basta: o usuário pode ter sido apagado ou trocado
    // de e-mail depois que o token foi emitido. Confere contra o banco.
    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({ errors: ["Usuário inválido."] });
    }

    req.userId = id;
    req.userEmail = email;
    return next();
  } catch {
    return res.status(401).json({ errors: ["Token expirado ou inválido."] });
  }
};

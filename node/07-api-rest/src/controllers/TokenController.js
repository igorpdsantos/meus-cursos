import jwt from "jsonwebtoken";
import User from "../models/User.js";

/* global process */

class TokenController {
  // POST /tokens — troca e-mail + senha por um token
  async store(req, res) {
    const { email = "", password = "" } = req.body;

    if (!email || !password) {
      return res.status(400).json({ errors: ["Credenciais inválidas."] });
    }

    const user = await User.findOne({ where: { email } });

    // Mensagem igual para "não existe" e "senha errada": responder coisas
    // diferentes entregaria de graça quais e-mails estão cadastrados.
    if (!user || !(await user.passwordIsValid(password))) {
      return res.status(401).json({ errors: ["Credenciais inválidas."] });
    }

    const { id, nome } = user;

    // Só id e email entram no token. Ele vai e volta pelo cliente, que
    // consegue ler o conteúdo — nada sigiloso pode morar aqui dentro.
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION || "7d",
    });

    return res.json({ token, user: { id, nome, email } });
  }
}

export default new TokenController();

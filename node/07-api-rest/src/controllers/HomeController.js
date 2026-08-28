class HomeController {
  index(req, res) {
    return res.json({
      api: "07-api-rest",
      rotas: {
        "POST   /tokens": "login: e-mail + senha → token (vale 7 dias)",
        "POST   /users": "cadastro (aberto)",
        "GET    /users": "lista usuários",
        "GET    /users/:id": "mostra um usuário",
        "PUT    /users": "atualiza o usuário do token (corpo completo)",
        "PATCH  /users": "atualiza o usuário do token (só o que enviar)",
        "DELETE /users": "apaga o usuário do token",
        "GET    /alunos": "lista alunos",
        "GET    /alunos/:id": "mostra um aluno",
        "POST   /alunos": "cria aluno",
        "PUT    /alunos/:id": "atualiza aluno (corpo completo)",
        "PATCH  /alunos/:id": "atualiza aluno (só o que enviar)",
        "DELETE /alunos/:id": "apaga aluno",
        "GET    /fotos": "lista fotos",
        "GET    /fotos/:id": "mostra uma foto",
        "POST   /fotos": "envia foto (multipart: foto + aluno_id ou user_id)",
        "DELETE /fotos/:id": "apaga foto do banco e do disco",
      },
      autenticacao: "Header Authorization: Bearer <token> em tudo menos POST /tokens e POST /users",
    });
  }
}

export default new HomeController();

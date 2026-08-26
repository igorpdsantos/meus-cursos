exports.paginaInicial = (req, res) => {
  res.render('index');   // as mensagens flash já chegam pela view via res.locals
};

exports.trataPost = (req, res) => {
  const nome = (req.body.nome || '').trim();

  if (!nome) {
    req.flash('erro', 'O nome não pode ficar vazio.');
  } else {
    req.flash('sucesso', `Formulário recebido. Olá, ${nome}!`);
  }

  // Post/Redirect/Get: responder o POST com um redirect evita que o F5 do navegador
  // reenvie o formulário. A mensagem sobrevive ao redirect porque ficou na sessão —
  // e é exatamente para isso que o flash existe.
  return res.redirect('/');
};

exports.paginaInicial = (req, res) => {
  res.render('index');
}

exports.trataPost = (req, res) => {
  res.render('index', { nome: req.body.nome });
}
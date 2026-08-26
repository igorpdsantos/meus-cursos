// Middleware global: roda em TODA requisição que chega no servidor.
exports.meuMiddleware = (req, res, next) => {
  console.log('middleware global: passei por aqui');
  next();   // obrigatório: sem next() a requisição para aqui e o navegador fica carregando para sempre
};

// Leva as mensagens flash para dentro das views.
// Sem isto você teria que repetir `req.flash(...)` em todo controller.
exports.expoeFlash = (req, res, next) => {
  // `res.locals` é um objeto que a view enxerga direto, sem passar pelo res.render().
  res.locals.sucessos = req.flash('sucesso');
  res.locals.erros = req.flash('erro');
  next();
};

// Conta quantas vezes ESTE visitante abriu a página.
// É o exemplo mais curto de sessão: o dado sobrevive entre requisições diferentes.
exports.contaVisitas = (req, res, next) => {
  req.session.visitas = (req.session.visitas || 0) + 1;
  res.locals.visitas = req.session.visitas;
  next();
};

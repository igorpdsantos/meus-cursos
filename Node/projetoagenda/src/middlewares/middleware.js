exports.middlewareGlobal = (req, res, next) => {
  // Getter: as mensagens só são lidas na hora de renderizar a view,
  // então funciona tanto para flash + redirect quanto para flash na mesma requisição.
  Object.defineProperty(res.locals, 'errors', {
    get: () => req.flash('errors'),
    enumerable: true,
    configurable: true
  });

  Object.defineProperty(res.locals, 'success', {
    get: () => req.flash('success'),
    enumerable: true,
    configurable: true
  });

  res.locals.user = req.session.user;

  next();
};

exports.outroMiddleware = (req, res, next) => {
  next();
};

exports.checkCsrfError = (err, req, res, next) => {
  if(err) {
    return res.render('404');
  }

  next(err);
};

exports.csrfMiddleware = (req, res, next) => {
  res.locals.csrfToken = req.csrfToken();
  next();
};

// Nenhuma rota respondeu: página não encontrada
exports.paginaNaoEncontrada = (req, res) => {
  res.status(404).render('404');
};

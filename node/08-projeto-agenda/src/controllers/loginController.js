const Login = require('../models/LoginModel');

exports.index = (req, res) => {
  // Já logado não precisa ver o formulário de novo.
  if(req.session.user) return res.redirect('/');
  res.render('login');
};

exports.register = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.register();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('/login'));
      return;
    }

    req.flash('success', 'Seu usuário foi criado com sucesso.');
    req.session.save(() => res.redirect('/login'));
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.login = async (req, res) => {
  try {
    const login = new Login(req.body);
    await login.login();

    if(login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('/login'));
      return;
    }

    // Guardar na sessão é o que mantém o usuário logado entre requisições.
    req.session.user = login.user;
    req.flash('success', 'Você entrou no sistema.');
    req.session.save(() => res.redirect('/login'));
  } catch(e) {
    console.log(e);
    return res.render('404');
  }
};

exports.logout = (req, res) => {
  req.session.destroy();
  res.redirect('/');
};

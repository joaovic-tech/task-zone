const { verify } = require('jsonwebtoken');

class Middleware {
  loginRequired(req, res, next) {
    if (!req.session.user) {
      req.flash("errors", `Você precisar está logado para acessar a página`);
      return req.session.save(() => res.redirect('/login'));
    }

    const { token } = req.session.user;

    try {
      verify(token, process.env.TOKEN_SECRET);
      
      return next();
    } catch (err) {
      console.error(err);
      req.flash("errors", `Token inválido ou expirado`);
      return req.session.save(() => res.redirect('/login/logout'));
    }
  }
}

module.exports = new Middleware();

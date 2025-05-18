const autenticarUsuario = require('./autenticarUsuario');

module.exports = [
  autenticarUsuario,
  (req, res, next) => {
    if (req.user && req.user.role === 'gerente') {
      return next();
    }
    return res.status(403).json({ error: 'Apenas gerentes têm permissão para essa ação.' });
  }
];

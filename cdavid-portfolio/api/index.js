const app = require('../server/server');

module.exports = (req, res) => {
  const rewrittenPath = Array.isArray(req.query.path) ? req.query.path[0] : req.query.path;

  if (rewrittenPath) {
    req.url = rewrittenPath.startsWith('/') ? rewrittenPath : `/${rewrittenPath}`;
  }

  return app(req, res);
};

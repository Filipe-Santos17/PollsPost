const jwt = require("jsonwebtoken");

module.exports = (req, res, next) => {
  const token = req.header("authorizarion");
  if (!token) return res.status(400).send({ message: "Acesso negado." });

  jwt.verify(token, process.env.SECRET, (err, validToken) => {
    if (err) {
      return res.status(400).send({ message: "token invalido" });
    } else {
      req.user = validToken;
      next();
    }
  });
};

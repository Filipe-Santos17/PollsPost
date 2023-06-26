const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DataUser = require("../database/models/UserModels");

module.exports = {
  async createUser(req, res) {
    const { email, name, password } = req.body;

    if (!name || !email || !password) {
      return res.status(403).json({ ErroMsg: "Dados Incompletos" });
    }

    const isUserValid = await DataUser.findOne({ where: { email: email } });

    if (!isUserValid) {
      const salt = await bcrypt.genSalt(10);
      const hashPass = await bcrypt.hash(password, salt);

      await DataUser.create({ email, name, password: hashPass });

      return res.status(201).json({ status: "ok" });
    } else {
      return res.status(406).json({ ErroMsg: "Usuario com esse email já existe" });
    }
  },

  async LoginUser(req, res) {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(403).json({ ErroMsg: "Dados Incompletos" });
    }

    const user = await DataUser.findOne({ raw: true, where: { email } });

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        const userData = {
          id: user.id,
          email: user.email,
          name: user.name,
        };

        token = jwt.sign(userData, process.env.SECRET);

        res.status(200).json({ token, userData });
      } else {
        res.status(400).json({ ErroMsg: "Senha Incorreta" });
      }
    } else {
      res.status(404).json({ ErroMsg: "Usuário não existe" });
    }
  },

  async ValidateToken(req, res) {
    const token = req.headers["authorizarion"];

    try {
      const tokenDecoded = jwt.verify(token, process.env.SECRET);

      const email = tokenDecoded.email;

      const isUserValid = await DataUser.findOne({ raw: true, where: { email } });

      if (isUserValid) {
        delete isUserValid.password //Usuário não pode receber a senha encripitada
        return res.status(200).json({ status: "ok", user: isUserValid });
      }
    } catch (error) {
      res.status(403).json({ status: "error", ErroMsg: "invalid token" });
    }
  },

  async ForgetPassword(req, res) {
    const { email } = req.body;

    const isUserValid = await DataUser.findOne({ where: { email } });

    if (isUserValid) {
      //enviar email
    } else {
      res.status(404).json({ ErroMsg: "Usuário não existe" });
    }
  },
};

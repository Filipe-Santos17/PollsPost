const DataAnswers = require("../database/models/AnswersModels");

module.exports = {
  async respPoll(req, res) {
    try {
      const { id_user_resp, id_poll_resp } = req.params;
      const { option_resp } = req.body;

      if (!id_user_resp || !id_poll_resp || !option_resp) {
        return res.status(403).json({ ErroMsg: "Dados Incompletos" });
      }

      if (option_resp < 1 || option_resp > 5) {
        return res.status(403).json({ ErroMsg: "Opção inexistente" });
      }

      await DataAnswers.create({id_user_resp, id_poll_resp, option_resp});

      return res.status(200).json({ status: "ok" });
    } catch (e) {
      return res.status(500).json({ ErroMsg: "Erro no servidor" });
    }
  },

  async getDataRespPoll(req,res) {
    try {
      const { id_poll_resp } = req.params;

      if (!id_poll_resp) {
        return res.status(403).json({ ErroMsg: "Dados Incompletos" });
      }

      const dataResp = await DataAnswers.findAll({ raw: true, where: { id_poll_resp: id_poll_resp } });

      const resps = []

      dataResp.map(item => resps.push(item.option_resp))

      return res.status(200).json({ status: "ok", allData: dataResp, resps });
    } catch (e) {
      return res.status(500).json({ ErroMsg: "Erro no servidor" });
    }
  },
};

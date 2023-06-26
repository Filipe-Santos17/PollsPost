const DataUser = require("../database/models/UserModels");
const DataPoll = require("../database/models/PollModels");
const DataOption = require("../database/models/OptionModels");

module.exports = {
  async getAllPolls(req, res) {
    try {
      const dataPools = await DataPoll.findAll({ raw: true });

      return res.status(200).json({ status: "ok", data: dataPools });
    } catch (e) {
      return res.status(500).json({ ErroMsg: "Erro no servidor" });
    }
  },

  async getMyPolls(req, res) {
    try {
      const { user_id } = req.params;

      if (!user_id) {
        return res.status(403).json({ ErroMsg: "Dados Incompletos" });
      }

      const isValidUser = await DataUser.findByPk(user_id);

      if (!isValidUser) {
        return res.status(400).json({ ErroMsg: "Usuário não existe" });
      }

      const polls = await DataPoll.findAll({
        where: { user_id: user_id },
      });

      return res.status(201).json({ status: "ok", polls });
    } catch (e) {
      return res.status(500).json({ ErroMsg: "Erro no servidor" });
    }
  },

  async getOnePoll(req, res) {
    try {
      const { poll_id } = req.params;

      if (!poll_id) {
        return res.status(403).json({ ErroMsg: "Dados Incompletos" });
      }

      const isValidPoll = await DataPoll.findByPk(poll_id, {
        include: "polls",
      });

      if (!isValidPoll) {
        return res.status(400).json({ ErroMsg: "Enquete não existe" });
      }

      return res.status(201).json({ status: "ok", poll: isValidPoll });
    } catch (e) {
      return res.status(500).json({ ErroMsg: "Erro no servidor" });
    }
  },

  async createPool(req, res) {
    try {
      const { user_id } = req.params;
      const { name, option_one, option_two, option_three, option_four, option_five } = req.body;

      if (!user_id || !name || !option_one || !option_two) {
        return res.status(403).json({ ErroMsg: "Dados Incompletos" });
      }

      const isValidUser = await DataUser.findByPk(user_id);

      if (!isValidUser) {
        return res.status(400).json({ ErroMsg: "Usuário não existe" });
      }

      const poll = await DataPoll.create({ name, user_id });

      await DataOption.create({
        option_one,
        option_two,
        option_three,
        option_four,
        option_five,
        poll_id: poll.id,
      });

      return res.status(201).json({ status: "ok" });
    } catch (e) {
      return res.status(500).json({ ErroMsg: "Erro no servidor" });
    }
  },

  async editPoll(req, res) {
    try {
      const { user_id, poll_id } = req.params;
      const { optionId, name, option_one, option_two, option_three, option_four, option_five } = req.body;

      if (!user_id || !name || !option_one || !option_two) {
        return res.status(403).json({ ErroMsg: "Dados Incompletos" });
      }

      const isValidUser = await DataUser.findByPk(user_id);

      if (!isValidUser) {
        return res.status(400).json({ ErroMsg: "Usuário não existe" });
      }

      const isValidPoll = await DataPoll.findByPk(poll_id);
      const isValidOption = await DataOption.findByPk(optionId);

      if (!isValidPoll || !isValidOption) {
        return res.status(400).json({ ErroMsg: "Enquente não existe" });
      }

      const a = await DataPoll.update({ name: name }, { where: { user_id: user_id, id: poll_id } });

      const b = await DataOption.update({ option_one, option_two, option_three, option_four, option_five }, { where: { poll_id: poll_id, id: optionId } });

      return res.status(201).json({ status: "ok" });
    } catch (e) {
      return res.status(500).json({ ErroMsg: "Erro no servidor" });
    }
  },

  async deletePool(req, res) {
    try {
      const { poll_id } = req.params;

      if (!poll_id) {
        return res.status(403).json({ ErroMsg: "Dados Incompletos" });
      }

      const isValidPool = await DataPoll.findByPk(poll_id);

      if (!isValidPool) {
        return res.status(400).json({ ErroMsg: "Enquete não existe" });
      }

      await isValidPool.destroy();

      return res.status(200).json({ status: "ok" });
    } catch (e) {
      return res.status(500).json({ ErroMsg: "Erro no servidor" });
    }
  },

  async answerPool(req, res) {},
};

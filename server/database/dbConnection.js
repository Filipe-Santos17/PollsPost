const sequelize = require("sequelize");
const dbConfig = require("./config/config-database");

const User = require("./models/UserModels");
const Poll = require("./models/PollModels");
const Option = require("./models/OptionModels");

const connection = new sequelize(dbConfig);

User.init(connection);
Poll.init(connection);
Option.init(connection);

Poll.associate(connection.models);
Option.associate(connection.models);

connection
  .authenticate()
  .then(console.log("Conectado com sucesso ao banco de Dados"))
  .catch((e) => console.log(`Erro: ${e}`));

module.exports = connection;

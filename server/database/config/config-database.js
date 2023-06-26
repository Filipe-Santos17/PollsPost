require("dotenv").config();

module.exports = {
  dialect: "mysql",
  host: "localhost",
  username: process.env.USERDB,
  password: process.env.PASSDB,
  database: process.env.DBNAME, //Nome da Base que será utilizada
  define: {
    timestamps: true, //Padroniza o created_at(criação) e updated_at(ultima modificação)
    underscored: true, //Habilita o padrão snake_case
  },
};

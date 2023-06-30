const { Model, DataTypes } = require("sequelize");

class DataAnswer extends Model {
  static init(connection) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
          unique: true,
        },
        id_user_resp:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        id_poll_resp:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
        option_resp:{
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize: connection, //conexão com banco de dados
      }
    );
  }
}

module.exports = DataAnswer;
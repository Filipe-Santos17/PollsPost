const { Model, DataTypes } = require("sequelize");

class DataUser extends Model {
  static init(connection) {
    super.init(
      {
        id:{
          type: DataTypes.INTEGER,
          primaryKey: true,
          unique: true,
          allowNull: false,
          autoIncrement: true,
        },
        email: {
          type: DataTypes.STRING,
          primaryKey: false,
          unique: true,
          allowNull: false,
        },
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING,
          allowNull: false,
        }
      },
      {
        sequelize: connection, //conexão com banco de dados
      }
    );
  }
}

module.exports = DataUser;
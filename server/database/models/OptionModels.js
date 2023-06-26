const { Model, DataTypes } = require("sequelize");

class DataOption extends Model {
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
        option_one: {
          type: DataTypes.STRING,
          allowNull: false,
          autoIncrement: false,
        },
        option_two: {
          type: DataTypes.STRING,
          allowNull: false,
          autoIncrement: false,
        },
        option_three: {
          type: DataTypes.STRING,
          allowNull: true,
          autoIncrement: false,
        },
        option_four: {
          type: DataTypes.STRING,
          allowNull: true,
          autoIncrement: false,
        },
        option_five: {
          type: DataTypes.STRING,
          allowNull: true,
          autoIncrement: false,
        },
      },
      {
        sequelize: connection, //conexão com banco de dados
      }
    );
  }

  static associate(models) {
    this.belongsTo(models.DataPoll, {
      foreignKey: "poll_id",
      as: "owner",
    });
  }
}

module.exports = DataOption;

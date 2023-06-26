const { Model, DataTypes } = require("sequelize");

class DataPoll extends Model {
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
        name: {
          type: DataTypes.STRING,
          allowNull: false,
          autoIncrement: false,
        },
      },
      {
        sequelize: connection, //conexão com banco de dados
      }
    );
  }

  static associate(models){
    this.belongsTo(models.DataUser, {
      foreignKey: 'user_id',
      as: 'owner'
    });

    this.hasMany(models.DataOption, {
      foreignKey: 'poll_id',
      as: 'polls'
    });
  }
}

module.exports = DataPoll;
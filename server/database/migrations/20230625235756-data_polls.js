//user migrate
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('data_polls', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
      },
      user_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'data_users', key: 'id'},
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      created_at:{
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at:{
        type: Sequelize.DATE,
        allowNull: false,
      }
    })
  },
  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable('data_polls');
  }
};

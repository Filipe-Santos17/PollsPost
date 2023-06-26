//user migrate
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('data_users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
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
    await queryInterface.dropTable('data-users');
  }
};

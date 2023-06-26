//user migrate
'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.createTable('data_options', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        unique: true,
      },
      option_one: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
      },
      option_two: {
        type: Sequelize.STRING,
        allowNull: false,
        autoIncrement: false,
      },
      option_three: {
        type: Sequelize.STRING,
        allowNull: true,
        autoIncrement: false,
      },
      option_four: {
        type: Sequelize.STRING,
        allowNull: true,
        autoIncrement: false,
      },
      option_five: {
        type: Sequelize.STRING,
        allowNull: true,
        autoIncrement: false,
      },
      poll_id:{
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {model: 'data_polls', key: 'id'},
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
    await queryInterface.dropTable('data_options');
  }
};

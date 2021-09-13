'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ccps', {

      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      codigo: {
        type: Sequelize.STRING(6),
        primaryKey: true,
        allowNull: false,
        unique: true
      },

      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      is_ccp: {
        type: Sequelize.TINYINT,
        allowNull: false,
        defaultValue: 1,
      },

      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: new Date(),
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ccps');
  }
};
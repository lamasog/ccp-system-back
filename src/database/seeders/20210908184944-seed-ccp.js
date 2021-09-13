'use strict';

const { generateHash } = require("../../utils/auth");
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('ccps', [{
        codigo: '111111',
        name: 'Ccp',
        password: await generateHash(process.env.CCP_PASSWORD),
      }], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ccps', null, {});
  }
};
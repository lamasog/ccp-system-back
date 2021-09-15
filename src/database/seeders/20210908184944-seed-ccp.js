'use strict';

const { generateHash } = require("../../utils/auth");
require('dotenv').config();

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const ccp = await queryInterface.sequelize.query("SELECT codigo FROM ccps WHERE codigo = '111111'");

    if(ccp[0].length === 0)
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
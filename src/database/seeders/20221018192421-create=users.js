"use strict";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const bcrypt = require("bcrypt");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("users", [
      {
        name: "Wesley Alves",
        email: "wesley@gmail.com",
        password: await bcrypt.hash("test@123", 8),
        birth: "28/01/1998",
        phone: "+5511999727429",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};

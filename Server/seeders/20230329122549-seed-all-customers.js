'use strict';
const { hashPassword } = require('../helpers/password-hashing-bcrypt')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const customers = require('../data.json').customers
    await queryInterface.bulkInsert('Customers', customers.map(el => {
      const hashedPassword = hashPassword(el.password);
      el.password = hashedPassword;
      el.createdAt = el.updatedAt = new Date();
      return el; 
    }), {})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Customers', null, {})
  }
};

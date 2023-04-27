'use strict';

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
    const customerFavorites = require('../data.json').customerFavorites
    await queryInterface.bulkInsert('CustomerFavorites', customerFavorites.map(el => {
      el.createdAt = el.updatedAt = new Date()
      return el
    }),{})
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('CustomerFavorites', null, {})
  }
};

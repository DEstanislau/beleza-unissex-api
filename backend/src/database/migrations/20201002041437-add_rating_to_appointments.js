module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('appointments', 'rating_appointment', {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('appointments', 'rating_appointment');
  },
};

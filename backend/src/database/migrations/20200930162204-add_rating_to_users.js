module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'rating', {
      type: Sequelize.DOUBLE,
      defaultValue: 0,
      allowNull: false,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'rating');
  },
};

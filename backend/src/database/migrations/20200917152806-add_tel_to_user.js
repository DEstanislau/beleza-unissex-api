module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'tel', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'tel');
  },
};

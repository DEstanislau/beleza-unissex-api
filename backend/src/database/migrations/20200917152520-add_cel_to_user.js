module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'cel', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'cel');
  },
};

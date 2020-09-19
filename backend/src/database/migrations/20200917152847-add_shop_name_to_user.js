module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'shop_name', {
      type: Sequelize.STRING,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('users', 'shop_name');
  },
};

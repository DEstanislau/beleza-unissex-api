module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('products', 'canceled_at', {
      type: Sequelize.DATE,
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('products', 'canceled_at');
  },
};

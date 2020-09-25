module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('appointments', 'product_id', {
      type: Sequelize.INTEGER,
      references: { model: 'products', key: 'id' },
      onUpdate: 'CASCADE',
      onDelet: 'SET NULL',
      allowNull: true,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('appointments', 'product_id');
  },
};

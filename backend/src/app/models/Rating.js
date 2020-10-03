import Sequelize, { Model } from 'sequelize';

class Rating extends Model {
  static init(sequelize) {
    super.init(
      {
        stars: Sequelize.DOUBLE,
        count: Sequelize.INTEGER,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'provider_id', as: 'provider' });
  }
}

export default Rating;

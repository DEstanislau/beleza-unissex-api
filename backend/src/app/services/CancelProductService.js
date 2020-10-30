import Product from '../models/Product';
import User from '../models/User';

class CancelProductService {
  async run({ provider_id, user_id }) {
    const product = await Product.findByPk(provider_id, {
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['name', 'email'],
        },
      ],
    });

    if (product.provider_id !== user_id) {
      throw new Error("You don't have permission to remove this Service.");
    }

    product.destroy();

    return product;
  }
}

export default new CancelProductService();

import User from '../models/User';
import Product from '../models/Product';

class CreateProductService {
  async run({ name_product, price, provider_id }) {
    const checkIsProvider = await User.findOne({
      where: { id: provider_id, provider: true },
    });

    if (!checkIsProvider) {
      throw new Error('You can only create Products with providers');
    }

    const product = await Product.create({
      name_product,
      price,
      provider_id,
    });

    return product;
  }
}

export default new CreateProductService();

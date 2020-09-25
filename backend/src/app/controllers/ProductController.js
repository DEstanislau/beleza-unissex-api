import Product from '../models/Product';
import User from '../models/User';
import File from '../models/File';

import CancelProductService from '../services/CancelProductService';
import CreateProductService from '../services/CreateProductService';

class ProductController {
  async indexMobile(req, res) {
    const { page = 1 } = req.query;

    const products = await Product.findAll({
      attributes: ['id', 'name_product', 'price', 'canceled_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(products);
  }

  async index(req, res) {
    const { page = 1 } = req.query;

    const products = await Product.findAll({
      where: { provider_id: req.userId, canceled_at: null },
      attributes: ['id', 'name_product', 'price', 'canceled_at'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: User,
          as: 'provider',
          attributes: ['id', 'name'],
          include: [
            {
              model: File,
              as: 'avatar',
              attributes: ['id', 'path', 'url'],
            },
          ],
        },
      ],
    });

    return res.json(products);
  }

  async store(req, res) {
    const { name_product, price } = req.body;

    const product = await CreateProductService.run({
      provider_id: req.userId,
      name_product,
      price,
    });

    return res.json(product);
  }

  async delete(req, res) {
    const product = await CancelProductService.run({
      provider_id: req.params.id,
      user_id: req.userId,
    });

    return res.json(product);
  }
}

export default new ProductController();

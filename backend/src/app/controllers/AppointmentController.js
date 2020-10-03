import Appointment from '../models/Appointment';
import User from '../models/User';
import File from '../models/File';
import Product from '../models/Product';

import CreateAppointmentService from '../services/CreateAppointmentService';
import CancelAppointmentService from '../services/CancelAppointmentService';

// import Cache from '../../lib/Cache';

class AppointmentController {
  async index(req, res) {
    const { page = 1 } = req.query;

    // const cacheKey = `user:${req.userId}:appointments:${page}`;

    // const cached = await Cache.get(cacheKey);

    // if (cached) {
    //   return res.json(cached);
    // }

    const appointments = await Appointment.findAll({
      where: { user_id: req.userId, canceled_at: null },
      order: ['date'],
      attributes: ['id', 'date', 'past', 'cancelable', 'rating_appointment'],
      limit: 20,
      offset: (page - 1) * 20,
      include: [
        {
          model: Product,
          as: 'product',
          attributes: ['id', 'name_product', 'price', 'provider_id'],
        },
        {
          model: User,
          as: 'provider',
          attributes: [
            'id',
            'shop_name',
            'name',
            'email',
            'tel',
            'cel',
            'cep',
            'address',
            'house_number',
            'district',
            'city',
            'uf',
            'rating',
          ],
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

    // await Cache.set(cacheKey, appointments);

    return res.json(appointments);
  }

  async store(req, res) {
    const { provider_id, date, product_id } = req.body;

    const appointment = await CreateAppointmentService.run({
      provider_id,
      user_id: req.userId,
      date,
      product_id,
    });

    return res.json(appointment);
  }

  async delete(req, res) {
    const appointment = await CancelAppointmentService.run({
      provider_id: req.params.id,
      user_id: req.userId,
    });

    return res.json(appointment);
  }
}

export default new AppointmentController();

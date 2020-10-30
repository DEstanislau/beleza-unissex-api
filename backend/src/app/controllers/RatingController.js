import Appointment from '../models/Appointment';
import User from '../models/User';

class RatingController {
  async update(req, res) {
    const { rating_appointment } = req.body;

    const provider_id = req.params.providerId;
    const appointment_id = req.params.appointmentId;

    const user = await User.findByPk(provider_id);
    const appointment = await Appointment.findByPk(appointment_id);

    await appointment.update({
      rating_appointment,
    });

    const appointmentsStars = await Appointment.findAll({
      where: { provider_id },
    }).filter((item) => item.rating_appointment > 0);

    const ratingFilter = await appointmentsStars
      .map((item) => item.rating_appointment)
      .reduce((previous, next) => previous + next);

    const count = appointmentsStars.length;
    const stars = Number(ratingFilter / count).toFixed(1);

    await user.update({
      rating: stars,
    });

    return res.json(user);
  }
}
export default new RatingController();

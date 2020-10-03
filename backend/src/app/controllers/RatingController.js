import Appointment from '../models/Appointment';
import User from '../models/User';
import Rating from '../models/Rating';
import CreateRatingService from '../services/CreateRatingService';

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

    const checkExistence = await Rating.findOne({ where: { provider_id } });

    const appointmentsStars = await Appointment.findAll({
      where: { provider_id },
    });

    const ratingFilter = await appointmentsStars
      .map((item) => item.rating_appointment)
      .reduce((previous, next) => previous + next);

    if (!checkExistence) {
      CreateRatingService.run({
        starsRating: Number(rating_appointment).toFixed(1),
        count: 1,
        provider_id,
      });
    } else {
      const { count } = checkExistence;

      const newCount = count + 1;
      const stars = Number(ratingFilter / newCount).toFixed(1);

      await checkExistence.update({
        stars,
        count: newCount,
      });

      await user.update({
        rating: stars,
      });
    }
    return res.json(rating_appointment);
  }
}
export default new RatingController();

import Rating from '../models/Rating';
import User from '../models/User';

class CreateRatingService {
  async run({ starsRating, count, provider_id }) {
    const rating = await Rating.create({
      stars: starsRating,
      count,
      provider_id,
    });

    const user = await User.findByPk(provider_id);

    await user.update({
      rating: starsRating,
    });

    return rating;
  }
}

export default new CreateRatingService();

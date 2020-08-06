import User from '../models/User';
import crypto from 'crypto';

class ResetController {
  async forgotPassword(req, res) {
    const { identifier, email } = req.body;

    const user = await User.findOne({
      where: {
        identifier,
        email,
      },
    });

    if (!user) return res.status(401).json({ error: 'User not found' });

    const token = crypto.randomBytes(3).toString('hex');

    return res.json(token);
  }
}

export default new ResetController();

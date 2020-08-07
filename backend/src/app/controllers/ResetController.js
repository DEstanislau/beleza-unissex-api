import User from '../models/User';
import crypto from 'crypto';

import ResetPasswordMail from '../jobs/ResetPasswordMail';
import Queue from '../../lib/Queue';

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

    user.update({
      password: token,
    });

    await Queue.add(ResetPasswordMail.key, {
      user,
      token,
    });

    return res.json({
      message: 'Email Successfully sent',
    });
  }
}

export default new ResetController();

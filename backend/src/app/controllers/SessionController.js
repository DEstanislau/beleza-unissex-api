import jwt from 'jsonwebtoken';
import User from '../models/User';
import File from '../models/File';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({
      where: { email },
      include: [
        { model: File, as: 'avatar', attributes: ['id', 'path', 'url'] },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const {
      id,
      shop_name,
      tel,
      cel,
      name,
      identifier,
      cep,
      address,
      house_number,
      district,
      city,
      uf,
      provider,
      avatar,
    } = user;

    return res.json({
      user: {
        id,
        shop_name,
        tel,
        cel,
        name,
        email,
        identifier,
        cep,
        address,
        house_number,
        district,
        city,
        uf,
        provider,
        avatar,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();

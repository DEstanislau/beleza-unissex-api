import Mail from '../../lib/Mail';

class ResetPasswordMail {
  get key() {
    return 'ResetPasswordMail';
  }

  async handle({ data }) {
    const { user, token } = data;

    await Mail.sendMail({
      to: `${user.name} <${user.email}>`,
      subject: 'Recuperar Senha',
      template: 'resetPassword',
      context: {
        user: user.name,
        token,
      },
    });
  }
}

export default new ResetPasswordMail();

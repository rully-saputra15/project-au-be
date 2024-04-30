import AuthService from '../services/auth';

const signin = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await AuthService.login(email);
    res.status(200).send({
      success: true,
      message: 'User logined successfully',
      user,
    });
  } catch (error) {
    res
      .status(error.statusCode || 400)
      .send({ success: false, message: error.message, error });
  }
};

export default {
  signin,
};

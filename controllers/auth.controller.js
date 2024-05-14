import AuthService from '../services/auth';
import { jsonFailed, jsonSuccess } from '../utils/messageFormat.helpers';

const signIn = async (req, res) => {
    const { email, token } = req.body;

    try {
        const user = await AuthService.login(email, token);

        jsonSuccess(res, 200, 'Login successful', user.mappedData, {
            token: user.token,
        });
        // res.status(200).send({
        //   success: true,
        //   message: 'Login successful',
        //   user,
        // });
    } catch (error) {
        jsonFailed(res, error);
        // res
        //   .status(error.statusCode || 400)
        //   .send({ success: false, message: error.message, error });
    }
};

const signUp = async (req, res) => {
    const { email, oauth_token } = req.body;

    try {
        const user = await AuthService.register(email, oauth_token);

        jsonSuccess(res, 200, 'Signup successful', user.mappedData, {
            token: user.token,
        });
    } catch (error) {
        jsonFailed(res, error);
    }
};

export default {
    signIn,
    signUp,
};

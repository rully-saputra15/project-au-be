const AuthService = require('../services/auth');
const { jsonFailed, jsonSuccess } = require('../helpers/messageFormat.helpers');

const signIn = async (req, res) => {
    const { oauth_token } = req.body;

    try {
        const user = await AuthService.login(oauth_token);

        jsonSuccess(res, 200, 'Signin successful', user.mappedData, {
            token: user.token,
        });
    } catch (error) {
        jsonFailed(res, error);
    }
};

module.exports = {
    signIn,
};

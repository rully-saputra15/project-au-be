import UserService from '../services/user';
import { jsonFailed, jsonSuccess } from '../helpers/messageFormat.helpers';

const getCurrentUser = async (req, res) => {
    try {
        const user = await UserService.getUserById(req.user);

        jsonSuccess(res, 200, 'User data fetched successfully', user);
    } catch (error) {
        jsonFailed(res, error);
    }
};

export default {
    getCurrentUser,
};

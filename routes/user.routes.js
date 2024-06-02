import controller from '../controllers/user.controller';
import { validateJwtToken } from '../middleware';

export default (app) => {
    app.get('/api/user', validateJwtToken, controller.getCurrentUser);
};

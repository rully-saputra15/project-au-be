import controller from '../controllers/auth.controller';
import { validateSigninRequest } from '../middleware';

export default (app) => {
  app.post('/api/auth/signin', validateSigninRequest, controller.signin);
};

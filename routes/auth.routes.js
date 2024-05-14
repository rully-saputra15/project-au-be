import controller from '../controllers/auth.controller';
import { validateSigninRequest, validateSignupRequest } from '../middleware';

export default (app) => {
    app.post('/api/auth/signin', validateSigninRequest, controller.signIn);
    app.post('/api/auth/signup', validateSignupRequest, controller.signUp);
};

import controller from '../controllers/user.controller';

export default (app) => {
  app.get('/api/user', controller.getCurrentUser);
};

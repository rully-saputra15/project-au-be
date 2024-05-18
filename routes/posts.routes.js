import controller from '../controllers/posts.controller';
import { validatePostRequest } from '../middleware';

export default (app) => {
  app.get('/api/posts', controller.getAllPosts);
  app.post('/api/posts', validatePostRequest, controller.createPost);
};

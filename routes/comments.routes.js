import controller from '../controllers/comments.controller';
import { validateCommentRequest } from '../middleware';

export default (app) => {
  app.get('/api/comments', controller.getAllCommentsByPostId);
  app.post('/api/comments', validateCommentRequest, controller.createComments);
};

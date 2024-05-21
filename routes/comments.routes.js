import controller from '../controllers/comments.controller';
import { validateCommentRequest } from '../middleware';

export default (app) => {
  app.post('/api/comments', validateCommentRequest, controller.createComments);
};

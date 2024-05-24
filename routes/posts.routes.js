import controller from '../controllers/posts.controller';
import {
  validatePostRequest,
  validatePostReactRequest,
  validatePostUnreactRequest,
  validateJwtToken,
} from '../middleware';

export default (app) => {
  app.get('/api/posts', validateJwtToken, controller.getAllPosts);
  app.post('/api/posts', validatePostRequest, controller.createPost);
  // app.post(
  //   '/api/posts/reaction',
  //   validatePostReactRequest,
  //   controller.reactToPost
  // );
  app.put(
    '/api/posts/reaction',
    validateJwtToken,
    validatePostReactRequest,
    controller.reactToPost
  );
};

import controller from '../controllers/posts.controller';
import {
    validatePostRequest,
    validatePostReactRequest,
    validateJwtToken,
} from '../middleware';

export default (app) => {
    app.get('/api/posts', validateJwtToken, controller.getAllPosts);
    app.post(
        '/api/posts',
        validateJwtToken,
        validatePostRequest,
        controller.createPost
    );
    app.put(
        '/api/posts/reaction',
        validateJwtToken,
        validatePostReactRequest,
        controller.reactToPost
    );
};

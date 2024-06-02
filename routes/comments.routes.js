import controller from '../controllers/comments.controller';
import { validateCommentRequest, validateJwtToken } from '../middleware';

export default (app) => {
    app.get(
        '/api/comments',
        validateJwtToken,
        controller.getAllCommentsByPostId
    );
    app.post(
        '/api/comments',
        validateJwtToken,
        validateCommentRequest,
        controller.createComments
    );
};

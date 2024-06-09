const controller = require('../controllers/comments.controller');
const { validateCommentRequest, validateJwtToken } = require('../middleware');

module.exports = (app) => {
    app.get(
        '/api/comments',
        validateJwtToken
        controller.getAllCommentsByPostId
    );
    app.post(
        '/api/comments',
        validateJwtToken
        validateCommentRequest,
        controller.createComments
    );
};

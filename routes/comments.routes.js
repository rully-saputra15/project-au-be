const controller = require('../controllers/comments.controller');
const { validateCommentRequest, validateJwtToken } = require('../middleware');

module.exports = (app) => {
    app.get(
        '/api/comments',

        controller.getAllCommentsByPostId
    );
    app.post(
        '/api/comments',

        validateCommentRequest,
        controller.createComments
    );
};

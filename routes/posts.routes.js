const controller = require('../controllers/posts.controller');
const {
    validatePostRequest,
    validatePostReactRequest,
    validateJwtToken,
} = require('../middleware');

module.exports = (app) => {
    app.get('/api/posts', controller.getAllPosts);
    app.post(
        '/api/posts',

        validatePostRequest,
        controller.createPost
    );
    app.put(
        '/api/posts/reaction',

        validatePostReactRequest,
        controller.reactToPost
    );
};

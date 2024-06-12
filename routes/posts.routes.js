const controller = require('../controllers/posts.controller');
const {
    validatePostRequest,
    validatePostReactRequest,
    validateJwtToken,
} = require('../middleware');

module.exports = (app) => {
    app.get('/api/posts', controller.getAllPosts);
    app.get('/api/posts/:slug', controller.getDetailPost);
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

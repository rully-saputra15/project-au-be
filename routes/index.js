const authRoutes = require('./auth.routes');
const postRoutes = require('./posts.routes');
const commentRoutes = require('./comments.routes');
const userRoutes = require('./user.routes');

module.exports = [authRoutes, postRoutes, commentRoutes, userRoutes];

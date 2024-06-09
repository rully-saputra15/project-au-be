const controller = require('../controllers/auth.controller');
const { validateSigninRequest } = require('../middleware');

module.exports = (app) => {
    app.post('/api/auth/signin', validateSigninRequest, controller.signIn);
};

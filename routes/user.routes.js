const controller = require('../controllers/user.controller');
const { validateJwtToken } = require('../middleware');

module.exports = (app) => {
    app.get('/api/user', validateJwtToken, controller.getCurrentUser);
};

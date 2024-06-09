const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const routes = require('./routes/index');
// const rateLimiter = require('./middleware/rateLimiter.middleware');
require('dotenv').config();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

// app.use(rateLimiter);

app.get('/api/health-check', (req, res) => {
    res.status(200).send({
        message: 'API is healthy',
    });
});

routes.forEach((route) => {
    route(app);
});

app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Server listening on port ${[PORT]}`);
});

module.exports = app;

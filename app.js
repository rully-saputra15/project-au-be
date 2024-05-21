import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import rateLimiter from './middleware/rateLimiter.middleware';
import routes from './routes';

dotenv.config();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({ origin: '*' }));
app.use(morgan('dev'));

// app.use(rateLimiter);

app.post('/api/health-check', (req, res) => {
  console.log('req.body', req.body);

  res.status(200).send(req.body);
});

routes.forEach((route) => {
  route(app);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

module.exports = app;

import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import routes from './routes';

dotenv.config();

const app = express();

app.use(express.json());

app.use(morgan('dev'));

routes.forEach((route) => {
  route(app);
});

const port = process.env.PORT || 3001;

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on http://localhost:${port}`);
});

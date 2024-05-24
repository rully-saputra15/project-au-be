import jwt from 'jsonwebtoken';
import { jsonFailed } from '../helpers/messageFormat.helpers';
import { jwtEncode } from '../utils/jwtUtils';

const validateJwtToken = (req, res, next) => {
  const headers = req.headers.authorization || req.headers.Authorization;

  if (!headers?.startsWith('Bearer ')) {
    // jsonFailed(res, error);
  }

  const jwtToken = headers.split(' ')[1];

  jwt.verify(jwtToken, process.env.SECRET, (err, decoded) => {
    if (err) jsonFailed(res, err);

    req.user = decoded.userId;
  });

  next();
};

export default validateJwtToken;

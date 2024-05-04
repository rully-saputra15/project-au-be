// eslint-disable-next-line import/no-extraneous-dependencies
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();
const secretKey = process.env.SECRET;

export function jwtEncode(userId) {
  const token = jwt.sign({ userId }, process.env.SECRET);
  return token;
}

export function jwtDecode(token) {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded.userId;
  } catch (error) {
    throw new Error('Error decoding JWT');
  }
}

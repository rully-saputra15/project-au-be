// eslint-disable-next-line import/no-extraneous-dependencies
const jwt = require('jsonwebtoken');

require('dotenv').config();

const secretKey = process.env.SECRET;

exports.jwtEncode = (userId) => {
    const token = jwt.sign({ userId }, process.env.SECRET);
    return token;
};

exports.jwtDecode = (token) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded.userId;
    } catch (error) {
        throw new Error('Error decoding JWT');
    }
};

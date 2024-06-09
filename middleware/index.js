// import validateSigninRequest from './validateSigninRequest';
// import validatePostRequest from './validatePostRequest';
// import validateCommentRequest from './validateCommentRequest';
// import validatePostReactRequest from './validatePostReactRequest';
// import validateJwtToken from './validateJwtToken.middleware';
const validateSigninRequest = require('./validateSigninRequest');
const validatePostRequest = require('./validatePostRequest');
const validateCommentRequest = require('./validateCommentRequest');
const validatePostReactRequest = require('./validatePostReactRequest');

const validateJwtToken = require('./validateJwtToken.middleware');

module.exports = {
    validateSigninRequest,
    validatePostRequest,
    validateCommentRequest,
    validatePostReactRequest,
    validateJwtToken,
};

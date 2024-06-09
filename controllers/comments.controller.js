const { jsonFailed, jsonSuccess } = require('../helpers/messageFormat.helpers');
const CommentService = require('../services/comments');

const getAllCommentsByPostId = async (req, res) => {
    try {
        const { postId } = req.query;
        const data = await CommentService.getAll(postId);

        jsonSuccess(res, 200, 'User comments fetched successfully', data);
    } catch (error) {
        jsonFailed(res, error);
    }
};

const createComments = async (req, res) => {
    try {
        const { post_id, content, parent_id } = req.body;

        const data = await CommentService.insertComments(
            req.user,
            post_id,
            content,
            parent_id
        );

        jsonSuccess(res, 200, 'Comment created successfully', data);
    } catch (error) {
        jsonFailed(res, error);
    }
};

module.exports = {
    getAllCommentsByPostId,
    createComments,
};

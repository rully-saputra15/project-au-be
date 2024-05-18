import { jsonFailed, jsonSuccess } from '../helpers/messageFormat.helpers';
import CommentService from '../services/comments';

const createComments = async (req, res) => {
  try {
    const { post_id, content, parent_id } = req.body;

    const data = await CommentService.insertComments(
      post_id,
      4,
      content,
      parent_id
    );

    jsonSuccess(res, 200, 'Comment created successfully', data);
  } catch (error) {
    jsonFailed(res, error);
  }
};

export default {
  createComments,
};
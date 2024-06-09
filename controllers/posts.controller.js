const PostService = require('../services/posts');
const { jsonFailed, jsonSuccess } = require('../helpers/messageFormat.helpers');

const getAllPosts = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 5);
        const filter = req.body.search_filters;

        console.log('masuk siniiii');
        const post = await PostService.getAll(
            req.user,
            currentPage,
            limit,
            filter
        );

        console.log('POSTTT', post);

        jsonSuccess(res, 200, 'Posts data fetched successfully', post);
    } catch (error) {
        jsonFailed(res, error);
    }
};

const reactToPost = async (req, res) => {
    try {
        const { post_id, reaction } = req.body;
        const data = await PostService.reactToPost(req.user, post_id, reaction);

        jsonSuccess(res, 200, 'Successfully reacted to post');
    } catch (error) {
        jsonFailed(res, error);
    }
};

const createPost = async (req, res) => {
    try {
        const {
            daerah_driver,
            experience,
            nopol,
            platform,
            reaction,
            service,
        } = req.body;

        const data = await PostService.insertPost(
            req.user,
            daerah_driver,
            experience,
            nopol,
            platform,
            reaction,
            service
        );

        jsonSuccess(res, 200, 'Post created successfully', data);
    } catch (error) {
        jsonFailed(res, error);
    }
};

module.exports = {
    getAllPosts,
    reactToPost,
    createPost,
};

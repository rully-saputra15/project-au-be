const PostService = require('../services/posts');
const { jsonFailed, jsonSuccess } = require('../helpers/messageFormat.helpers');

const getAllPosts = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page || 1, 10);
        const limit = parseInt(req.query.limit || 5, 10);
        const filter = req.body.search_filters;

        const post = await PostService.getAll(
            req.user,
            currentPage,
            limit,
            filter
        );

        jsonSuccess(res, 200, 'Posts data fetched successfully', post);
    } catch (error) {
        jsonFailed(res, error);
    }
};

const getDetailPost = async (req, res) => {
    try {
        const { slug } = req.params;

        const post = await PostService.getPost(slug);

        jsonSuccess(res, 200, 'Post detail fetched successfully', post);
    } catch (error) {
        jsonFailed(res, error);
    }
};

const reactToPost = async (req, res) => {
    try {
        const { post_id, reaction } = req.body;
        await PostService.reactToPost(req.user, post_id, reaction);

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
    getDetailPost,
    reactToPost,
    createPost,
};

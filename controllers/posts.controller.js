import PostService from '../services/posts';
import { jsonFailed, jsonSuccess } from '../helpers/messageFormat.helpers';

const getAllPosts = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page || 1);
        const limit = parseInt(req.query.limit || 5);
        const filter = req.body.search_filters;
        req.user = { id: 13 }; // ini sementara doang. Nanti req.user akan ditambah ketika jwt didecode
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
            4, // ini nanti dari req.user
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

export default {
    getAllPosts,
    createPost,
};

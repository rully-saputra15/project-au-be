const SupabaseClient = require('../supabase');

const CommentService = {
    getAll: async (postId) => {
        const { data, error } = await SupabaseClient.from('Comment')
            .select(
                `
                id,
                content,
                User (
                    full_name,
                ),
                Comment(
                    content
                )
            `
            )
            .eq('post_id', postId);

        if (error) throw error;

        return data.map((item) => ({
            comment: item.content,
            created_by: item.User.full_name,
            sub_comments: item.Comment,
        }));
    },
    insertComments: async (post_id, authUserId, content, parent_id) => {
        const { data, error } = await SupabaseClient.from('Comment')
            .insert({
                authUserId,
                post_id,
                content,
                parent_id,
            })
            .select();

        if (error) throw error;

        return data;
    },
};

module.exports = CommentService;

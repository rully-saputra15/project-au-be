import SupabaseClient from '../supabase';

const CommentService = {
    getAll: async (postId) => {
        const { data, error } = await SupabaseClient.from('Comment')
            .select(
                `
        id,
        content,
        User (
          full_name
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
    insertComments: async (post_id, user_id, content, parent_id) => {
        const { data, error } = await SupabaseClient.from('Comment')
            .insert({
                post_id,
                user_id,
                content,
                parent_id,
            })
            .select();

        if (error) throw error;

        return data;
    },
};

export default CommentService;

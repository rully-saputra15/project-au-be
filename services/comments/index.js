import SupabaseClient from '../supabase';

const CommentService = {
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

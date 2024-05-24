import SupabaseClient from '../supabase';

const UserService = {
  getUserById: async (userId) => {
    const { data, error } = await SupabaseClient.from('User')
      .select('name:fullname, email, avatar')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return data;
  },
};

export default UserService;

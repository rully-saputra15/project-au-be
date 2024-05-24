import SupabaseClient from '../supabase';

const UserService = {
  getUserById: async (userId) => {
    console.log(userId);
    const { data, error } = await SupabaseClient.from('User')
      .select('name:full_name, email, avatar')
      .eq('id', userId)
      .single();

    if (error) throw error;

    return data;
  },
};

export default UserService;

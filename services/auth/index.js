import SupabaseClient from '../supabase';

const AuthService = {
  login: async (email) => {
    const { data, error } = await SupabaseClient.from('User')
      .select('*')
      .eq('email', email);

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      const notFoundError = new Error('Data not found');
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    return data;
  },
};

export default AuthService;

import { jwtEncode } from '../../utils/jwtUtils';
import { comparePassword, hashPassword } from '../../utils/passwordUtils';
import SupabaseClient from '../supabase';

const AuthService = {
  login: async (email, token, password) => {
    const { data, error } = await SupabaseClient.from('User')
      .select('*=')
      .eq('email', email)
      .eq('oauth_token', token);

    // const passwordMatch = await comparePassword(hashPassword(password), data[0].password);
    // if (!passwordMatch) {
    //   const error = new Error('Invalid Password');
    //   error.statusCode = 403;
    //   throw error;
    // }

    if (error) {
      throw error;
    }

    if (!data || data.length === 0) {
      const notFoundError = new Error('Account Not Found');
      notFoundError.statusCode = 404;
      throw notFoundError;
    }

    const mappedData = {
      user_id: data[0].id,
      full_name: data[0].full_name,
      avatar: data[0].avatar,
      email: data[0].email,
    };

    const jwtToken = jwtEncode(data[0].id);

    return { mappedData, token: jwtToken };
  },
};

export default AuthService;

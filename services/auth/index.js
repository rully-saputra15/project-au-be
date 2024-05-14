import { jwtEncode } from '../../utils/jwtUtils';
import SupabaseClient from '../supabase';

const AuthService = {
    login: async (email, token) => {
        const { data, error } = await SupabaseClient.from('User')
            .select('*=')
            .eq('email', email)
            .eq('oauth_token', token);

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
    register: async (email, oauth_token) => {
        const { error } = await SupabaseClient.from('User')
            .insert({
                email: email,
                oauth_token: oauth_token,
                full_name: email.match(/^([^@]*)@/)[1]
            });
        if(error) {
            throw error;
        }

        const { data } = await SupabaseClient.from('User')
            .select("*=")
            .eq("email", email)
            .eq("oauth_token", oauth_token);
        
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

const axios = require('axios');
const { jwtEncode } = require('../../utils/jwtUtils');
const SupabaseClient = require('../supabase');

const AuthService = {
    loginOld: async (email, token) => {
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
            userID: data[0].id,
            fullname: data[0].fullname,
            avatar: data[0].avatar,
            email: data[0].email,
        };

        const jwtToken = jwtEncode(data[0].id);

        return { mappedData, token: jwtToken };
    },
    login: async (oauth_token) => {
        const userDataGoogle = await axios
            .get(
                `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${oauth_token}`
            )
            .then((res) => {
                return res.data;
            });

        const checkData = await SupabaseClient.from('User')
            .select('*=')
            .eq('email', userDataGoogle.email)
            .single();

        if (checkData.data) {
            const { error } = await SupabaseClient.from('User')
                .update({ oauth_token })
                .eq('email', checkData.data.email);

            if (error) {
                throw error;
            }
        } else {
            const { error } = await SupabaseClient.from('User').insert({
                email: userDataGoogle.email,
                fullname: userDataGoogle.name,
                oauth_token,
                avatar: userDataGoogle.picture,
            });

            if (error) {
                throw error;
            }
        }

        const { data } = await SupabaseClient.from('User')
            .select('*=')
            .eq('email', userDataGoogle.email)
            .single();

        const mappedData = {
            user_id: data.id,
            fullname: data.fullname,
            avatar: data.avatar,
            email: data.email,
        };

        const jwtToken = jwtEncode(data.id);

        return { mappedData, token: jwtToken };
    },
};

module.exports = AuthService;

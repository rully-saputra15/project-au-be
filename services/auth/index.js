const { jwtEncode } = require('../../utils/jwtUtils');
const SupabaseClient = require('../supabase');

const AuthService = {
    login: async (oauth_token) => {
        const userDataGoogle = await fetch(
            `https://www.googleapis.com/oauth2/v2/userinfo?alt=json&access_token=${oauth_token}`
        ).then((res) => {
            return res.json();
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
                full_name: userDataGoogle.name,
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
            full_name: data.full_name,
            avatar: data.avatar,
            email: data.email,
        };

        const jwtToken = jwtEncode(data.id);

        return { mappedData, token: jwtToken };
    },
};

module.exports = AuthService;

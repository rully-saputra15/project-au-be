const SupabaseClient = require('../supabase');

const UserService = {
    getUserById: async (userId) => {
        const { data, error } = await SupabaseClient.from('User')
            .select('name:full_name, email, avatar')
            .eq('id', userId)
            .single();

        if (error) throw error;

        return data;
    },
};

module.exports = UserService;

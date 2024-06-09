const SupabaseClient = require('../supabase');
const REACTION_TYPES = require('../../constants/reactionTypes.constant');

const VoteService = {
    getReactionDataByPostId: async (postId) => {
        const { data: happyReactionData } = await SupabaseClient.from('Vote')
            .select(`happy_reaction_count:type.count()`)
            .eq('type', REACTION_TYPES.HAPPY)
            .eq('post_id', postId)
            .single();

        const { data: sadReactionData } = await SupabaseClient.from('Vote')
            .select(`sad_reaction_count:type.count()`)
            .eq('type', REACTION_TYPES.SAD)
            .eq('post_id', postId)
            .single();

        const { data: neutralReactionData } = await SupabaseClient.from('Vote')
            .select(`neutral_reaction_count:type.count()`)
            .eq('type', REACTION_TYPES.NEUTRAL)
            .eq('post_id', postId)
            .single();

        return { happyReactionData, sadReactionData, neutralReactionData };
    },

    reactToPost: async (authUserId, post_id, reaction) => {
        const { data: reactionData } = await SupabaseClient.from('Vote')
            .select('*')
            .eq('user_id', authUserId)
            .eq('post_id', post_id)
            .single();

        /* Ada 3 kondisi :
            1. Blm pernah react -> Mau react
                - Insert baru ke tabel Vote

            2. Pernah react -> mau unreact
                - Cari row yg existing punya user idnya
                - Update is_visible jadi false dan ambil reaction dari existing row

            3. Sudah pernah unreact -> mau react
                - Cari row yg existing punya user idnya
                - Update is_visible jadi true dan ambil reaction dari FE
        */

        const reactionFromUser = reaction?.toLowerCase();

        // Kondisi 2 dan 3
        if (reactionData) {
            const { error: updateError } = await SupabaseClient.from('Vote')
                .update({
                    is_visible: !reactionData.is_visible,
                    type: reactionFromUser ?? reactionData.type,
                })
                .eq('user_id', authUserId)
                .eq('post_id', post_id);

            if (updateError) throw updateError;
        } else {
            // Kondisi 1
            const { error: insertError } = await SupabaseClient.from(
                'Vote'
            ).insert({
                user_id: authUserId,
                post_id,
                type: reactionFromUser,
            });
            if (insertError) throw insertError;
        }
    },
};

module.exports = VoteService;

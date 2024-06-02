import { generateSlug } from '../../utils/generateSlug.utils';
import SupabaseClient from '../supabase';

const PostService = {
    insertPost: async (
        authUserId,
        daerah_driver,
        experience,
        nopol,
        platform,
        reaction,
        service
    ) => {
        const slug = generateSlug(experience);

        const { data, error } = await SupabaseClient.from('Post').insert({
            user_id: authUserId,
            slug,
            content: experience,
            location: daerah_driver,
            vendor_name: platform,
            service_type: service,
            plate_number: nopol,
        }).select(`
        id,
        content,
        slug,
        location,
        service_type,
        plate_number
      `);

        if (error) throw error;

        return data;
    },
    reactToPost: async (authUserId, post_id, reaction) => {
        const { data: reactionData, error } = await SupabaseClient.from('Vote')
            .select('*')
            .eq('user_id', authUserId)
            .eq('post_id', post_id)
            .single();

        if (error) throw error;

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

        // Kondisi 2 dan 3
        if (reactionData) {
            const { error: updateError } = await SupabaseClient.from('Vote')
                .update({
                    is_visible: !reactionData.is_visible,
                    type: reaction ?? reactionData.type,
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
                type: reaction,
            });
            if (insertError) throw insertError;
        }
    },

    getAll: async (authUserId, currentPage, limit, filterList) => {
        const startIndex = (currentPage - 1) * limit;
        const endIndex = currentPage * limit;

        // Dynamic filters
        let query = SupabaseClient.from('Post')
            .select(
                `
      id,
      content,
      slug,
      location,
      vendor_name,
      service_type,
      plate_number,
      reaction:Vote(count),
      user_reactions:Vote(
        type,
        User(id)
      ),
      User(
        id,
        fullname
      )
    `
            )
            .filter('deleted_at', 'is', null);

        if (filterList) {
            filterList.forEach(({ key, value }) => {
                query = query.filter(key, 'in', `(${value.join(',')})`);
            });
        }
        const { data, error } = await query
            .range(startIndex, endIndex)
            .limit(limit);

        if (error) throw error;

        const mappedData = data.map((item) => {
            const userReaction = item.user_reactions?.find(
                ({ User }) => User.id === authUserId
            );

            return {
                id: item.id,
                created_by: item.User?.fullname,
                content: item.content,
                slug: item.slug,
                driver_location: item.location,
                vendor_name: item.vendor_name,
                service_type: item.service_type,
                plate_number: item.plate_number,
                reaction_count: item.reaction[0].count,
                auth_user_reaction: {
                    is_user_reacted: !!userReaction, // convert ke t/f
                    type: userReaction?.type,
                },
            };
        });

        let pagination_meta = {
            current_page: currentPage,
            limit,
            ...(endIndex < mappedData.length && { next_page: currentPage + 1 }),
            ...(startIndex > 0 && { prev_page: currentPage - 1 }),
        };

        return {
            posts: mappedData,
            pagination_meta,
        };
    },
};

export default PostService;

import { generateSlug } from '../../utils/generateSlug.utils';
import SupabaseClient from '../supabase';

const PostService = {
  insertPost: async (
    user_id,
    daerah_driver,
    experience,
    nopol,
    platform,
    reaction,
    service
  ) => {
    const slug = generateSlug(experience);

    const { data, error } = await SupabaseClient.from('Post').insert({
      user_id,
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
  getAll: async (reqUser, currentPage, limit, filterList) => {
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
        full_name
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
        ({ User }) => User.id === reqUser.id
      );

      return {
        id: item.id,
        created_by: item.User?.full_name,
        content: item.content,
        slug: item.slug,
        driver_location: item.location,
        ojol_name: item.ojol_name,
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

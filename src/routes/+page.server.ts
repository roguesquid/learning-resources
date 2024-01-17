import { supabase } from '$lib/supabase-client';

export async function load() {}

const search = async (searchTerm: string) => {
    let results = [];

    if (searchTerm !== '') {
        const { data, error } = await supabase.rpc('search', { term_to_search: searchTerm });

        results = data ?? [];

        if (error) {
            throw error;
        }
    }

    return results;
};

export const actions = {
    search: async ({ request }) => {
        const formData = await request.formData();
        const searchTerm = formData.get('search');
        let results = [];

        if (searchTerm !== null) {
            results = await search(searchTerm.toString());
        }

        return { success: true, value: results };
    },
};

import { supabase } from '$lib/supabase-client';

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    let results = [];

    const { learning_object_id } = params;

    if (learning_object_id !== '') {
        const learning_object_id_NUMBER = Number(learning_object_id);

        const { data, error } = await supabase.rpc('get_learning_object_details', {
            id_resource: learning_object_id_NUMBER,
        });

        if (error) {
            throw error;
        }

        const tags = await supabase.rpc('get_learning_object_tags', {
            learning_object_id: learning_object_id_NUMBER,
        });
        const tagsData = tags.data;

        const tagsError = tags.error;
        if (tagsError) {
            throw tagsError;
        }

        const tagsArray: string[] = [];
        tagsData.forEach((element) => {
            tagsArray.push(element.name);
        });

        const resultadosDetalles = data[0] ?? {};

        results = {
            ...resultadosDetalles,
            tagsArray,
        };
    }

    return results;
};

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

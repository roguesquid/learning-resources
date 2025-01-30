import { supabase } from '$lib/supabase-client';

export async function load() {}

const getAuthors = async (authorIds: number[]) => {
    const authorPromises = authorIds.map(async (id) => {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/autor/${id}`);
        const data = await response.json();
        return data.name;
    });
    return Promise.all(authorPromises);
};

const search = async (searchTerm: string) => {
    let results = [];

    if (searchTerm !== '') {
        // Realizar la solicitud a la API de WordPress
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/objetos_de_aprendiza?search=${searchTerm}`);
        const data = await response.json();

        results = await Promise.all(
            data.map(async (item: any) => {
                const authors = await getAuthors(item.autor);
                return {
                    id: item.id,
                    title: item.title.rendered,
                    content: item.content.rendered,
                    author: authors, // Now contains author names
                    date: item.date,
                    unit: item.unidad,
                    name: item.nombre,
                    objective: item.objetivo,
                    year: item.ano,
                    link: item.link,
                };
            }),
        );
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

import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
    let results = [];

    const { learning_object_id } = params;

    if (learning_object_id !== '') {
        const learning_object_id_NUMBER = Number(learning_object_id);
        const response = await fetch(
            `http://localhost:8000/wp-json/wp/v2/objetos_de_aprendiza?id=${learning_object_id_NUMBER}`,
        );

        if (response.ok) {
            const data = await response.json();
            const authors = await getAuthors(data[0].autor);
            const tags = await getTags(data[0].tag_p);
            if (data && data.length > 0) {
                const resultadosDetalles = data[0] ?? {};

                const responseFormato = await fetch(
                    `http://localhost:8000/wp-json/wp/v2/formato/${resultadosDetalles?.formato[0]}?_fields=name`,
                );
                const dataFormato = await responseFormato.json();

                const responseTerm = await fetch(
                    `http://localhost:8000/wp-json/wp/v2/term_lr/${resultadosDetalles?.term_lr[0]}?_fields=name`,
                );
                const dataTerm = await responseTerm.json();
                results = {
                    ...resultadosDetalles,
                    formato: dataFormato.name,
                    autor: authors[0],
                    term: dataTerm.name,
                    tags: tags,
                };
                console.log(results);
            }
        }
    }

    return results;
};

const getAuthors = async (authorIds: number[]) => {
    const authorPromises = authorIds.map(async (id) => {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/autor/${id}`);
        if (response.ok) {
            const data = await response.json();
            return data.name;
        }
        return null;
    });
    return Promise.all(authorPromises);
};

const getTags = async (tagsIds: number[]) => {
    const tagsPromises = tagsIds.map(async (id) => {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/tag_p/${id}`);
        if (response.ok) {
            const data = await response.json();
            return data.name;
        }
        return null;
    });
    return Promise.all(tagsPromises);
};

const search = async (searchTerm: string, filters: any) => {
    let results = [];

    if (searchTerm !== '') {
        // Construir la URL con los filtros
        let url = `http://localhost:8000/wp-json/wp/v2/objetos_de_aprendiza?search=${searchTerm}`;

        if (filters.area) {
            url += `&area=${filters.area}`;
        }
        if (filters.formato) {
            url += `&formato=${filters.formato}`;
        }
        if (filters.lenguaje) {
            url += `&lenguaje=${filters.lenguaje}`;
        }
        // Agrega otros filtros según sea necesario

        const response = await fetch(url);
        if (response.ok) {
            const data = await response.json();

            results = await Promise.all(
                data.map(async (item: any) => {
                    const authors = await getAuthors(item.autor);
                    return {
                        id: item.id,
                        title: item.title.rendered,
                        content: item.content.rendered,
                        author: authors.filter((name: string | null) => name !== null), // Filter out null values
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
    }
    return results;
};

export const actions = {
    search: async ({ request }) => {
        const formData = await request.formData();
        const searchTerm = formData.get('search');
        const filters = {
            area: formData.get('area'),
            formato: formData.get('formato'),
            lenguaje: formData.get('lenguaje'),
            // Agrega otros filtros según sea necesario
        };
        let results = [];

        if (searchTerm !== null) {
            results = await search(searchTerm.toString(), filters);
        }

        return { success: true, value: results };
    },
};

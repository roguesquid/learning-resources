<script lang="ts">
    import { onMount } from 'svelte';

    import { MultiSelect } from 'flowbite-svelte';

    import { supabase } from '$lib/supabase-client';
    import { tagsFilter } from '$stores/search.store';

    let tags: Array<{ value: string; name: string }> = [];

    const load = async () => {
        const { data } = await supabase.from('tags').select();

        tags = data?.map((tag) => ({ value: tag.id, name: tag.name.toLocaleUpperCase() })) ?? [];
    };

    // const filter = async (searchTerm: string) => {
    //     let results = [];

    //     if (searchTerm !== '') {
    //         const { data, error } = await supabase.rpc('search', { term_to_search: searchTerm });

    //         results = data ?? [];

    //         if (error) {
    //             throw error;
    //         }
    //     }

    //     return results;
    // };

    onMount(() => {
        load();
    });
</script>

<MultiSelect items="{tags}" bind:value="{$tagsFilter}" size="sm" />

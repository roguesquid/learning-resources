<script lang="ts">
    import { onMount } from 'svelte';

    import { MultiSelect } from 'flowbite-svelte';

    import { supabase } from '$lib/supabase-client';

    let selected: Array<string> = [];
    let authors: Array<{ value: string; name: string }> = [];

    const load = async () => {
        const { data } = await supabase.from('authors').select();

        authors = data?.map((author) => ({ value: author.id, name: `${author.first_name} ${author.last_name}` })) ?? [];
    };

    onMount(() => {
        load();
    });
</script>

<MultiSelect items="{authors}" bind:value="{selected}" size="sm" />

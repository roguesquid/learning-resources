<script lang="ts">
    import { onMount } from 'svelte';

    import { MultiSelect } from 'flowbite-svelte';

    import { authorsFilterStore } from '$stores/authors-filter.store';

    let selected: Array<string> = [];
    let authors: Array<{ value: string; name: string }> = [];

    const load = async () => {
        const response = await fetch(`http://localhost:8000/wp-json/wp/v2/autor?_fields=name,id`);

        const data = await response.json();

        authors = data?.map((author) => ({ value: author.id, name: author.name })) ?? [];
    };

    onMount(() => {
        load();
    });
</script>

<MultiSelect items="{authors}" bind:value="{$authorsFilterStore}" size="sm" />

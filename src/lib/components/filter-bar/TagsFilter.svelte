<script lang="ts">
    import { onMount } from 'svelte';

    import { MultiSelect } from 'flowbite-svelte';

    import { tagsFilter } from '$stores/search.store';

    let tags: Array<{ value: number; name: string }> = [];

    const load = async () => {
        const response = await fetch('http://localhost:8000/wp-json/wp/v2/tag_p?_fields=name,id');

        const data = await response.json();

        tags = data?.map((tag) => ({ value: tag.id, name: tag.name.toLocaleUpperCase() })) ?? [];
    };
    onMount(() => {
        load();
    });
</script>

<MultiSelect items="{tags}" bind:value="{$tagsFilter}" size="sm" />

<script lang="ts">
    import { onMount } from 'svelte';

    import { Checkbox } from 'flowbite-svelte';

    import { termFilterStore } from '$stores/term-filter.store';

    let terms = [];

    const load = async () => {
        const response = await fetch('http://localhost:8000/wp-json/wp/v2/term_lr?_fields=name,id');

        const data = await response.json();

        terms = data?.map((term) => ({ value: term.id, name: term.name.toLocaleUpperCase() })) ?? [];
        $termFilterStore = terms.map((term) => String(term.value));
    };
    onMount(() => {
        load();
    });

    function handleCheckboxChange(event) {
        const { checked, value } = event.target;
        if (checked) {
            $termFilterStore = [...$termFilterStore, value];
        } else {
            $termFilterStore = $termFilterStore.filter((term) => term !== value);
        }
    }
</script>

<section class="filter-content">
    {#each terms as term}
        <Checkbox value="{term.value}" checked on:change="{handleCheckboxChange}">
            {term.name}
        </Checkbox>
    {/each}
</section>

<style lang="postcss">
    .filter-content {
        @apply px-4;
    }
</style>

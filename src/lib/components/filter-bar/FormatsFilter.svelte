<script lang="ts">
    import { onMount } from 'svelte';

    import { Checkbox } from 'flowbite-svelte';

    import { formatsFilterStore } from '$stores/formats-filter.store';

    let formats = [];

    const load = async () => {
        const response = await fetch('http://localhost:8000/wp-json/wp/v2/formato?_fields=name,id');

        const data = await response.json();

        formats = data?.map((format) => ({ value: format.id, name: format.name.toLocaleUpperCase() })) ?? [];
        $formatsFilterStore = formats.map((format) => String(format.value));
    };
    onMount(() => {
        load();
    });

    function handleCheckboxChange(event) {
        const { checked, value } = event.target;
        if (checked) {
            $formatsFilterStore = [...$formatsFilterStore, value];
        } else {
            $formatsFilterStore = $formatsFilterStore.filter((format) => format !== value);
        }
    }
</script>

<section class="filter-content">
    {#each formats as format}
        <Checkbox value="{format.value}" checked on:change="{handleCheckboxChange}">
            {format.name}
        </Checkbox>
    {/each}
</section>

<style lang="postcss">
    .filter-content {
        @apply px-4;
    }
</style>

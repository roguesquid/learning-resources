<script lang="ts">
    import { onMount } from 'svelte';

    import { Checkbox } from 'flowbite-svelte';

    import { languageFilterStore } from '$stores/language-filter.store';

    let languages = [];

    const load = async () => {
        const response = await fetch('http://localhost:8000/wp-json/wp/v2/lenguaje?_fields=name,id');

        const data = await response.json();

        languages = data?.map((language) => ({ value: language.id, name: language.name.toLocaleUpperCase() })) ?? [];
        $languageFilterStore = languages.map((language) => String(language.value));
    };
    onMount(() => {
        load();
    });

    function handleCheckboxChange(event) {
        const { checked, value } = event.target;
        if (checked) {
            $languageFilterStore = [...$languageFilterStore, value];
        } else {
            $languageFilterStore = $languageFilterStore.filter((language) => language !== value);
        }
    }
</script>

<section class="filter-content">
    {#each languages as language}
        <Checkbox value="{language.value}" checked on:change="{handleCheckboxChange}">
            {language.name}
        </Checkbox>
    {/each}
</section>

<style lang="postcss">
    .filter-content {
        @apply px-4;
    }
</style>

<script lang="ts">
    import { Badge, Spinner } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';

    import { authorsFilterStore } from '$lib/stores/authors-filter.store';
    import { isLoading } from '$lib/stores/isLoading.store';
    import { languageFilterStore } from '$lib/stores/language-filter.store';
    import { _results, searchTerm } from '$lib/stores/search.store';

    export let form;

    let results = [];
    $: {
        results = form?.value;
        const authorsFilter = $authorsFilterStore;
        const languageFilter = $languageFilterStore;
        if (authorsFilter.length > 0) {
            results = results?.filter((entry) =>
                authorsFilter.includes(`${entry.author_first_name} ${entry.author_last_name}`),
            );
        }

        results = results?.filter((entry) => languageFilter.includes(entry.language));

        $isLoading = false;
    }
</script>

{#if results}
    <div class="results">
        <p class="border-b border-b-gray-300 p-2 dark:border-b-gray-700">
            {#if results}
                {results.length} resultado(s) encontrado(s) bajo el término de búsqueda <em>{$searchTerm}</em>.
            {:else}
                0 resultados encontrados.
            {/if}
        </p>
        {#each results as entry}
            <section class="entry">
                <h6>{entry.subject_code}: {entry.subject_name}</h6>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a class="hover:underline" href="/{entry.learning_object_id}">
                        {entry.unit} - {entry.name}
                    </a>
                </h5>
                <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
                    {entry.objective}
                </p>
                <p><b>Autor:</b> {entry.author_last_name}, {entry.author_first_name}</p>
                <p><Badge border>{entry.year}</Badge></p>
                <!-- <pre>{JSON.stringify(entry, null, 2)}</pre> -->
            </section>
        {/each}
    </div>
{:else if !results && $isLoading}
    <div class="flex h-full w-full flex-col items-center justify-center">
        <Spinner color="gray" size="12" class="mb-3" />
        <p>Cargando...</p>
    </div>
{:else}
    <div class="flex h-full w-full items-center justify-center">
        <div class="flex flex-col items-center">
            <SearchOutline class="mb-4 h-24 w-24" />
            <h3 class="select-none text-center text-xl">
                Prueba a buscar un recurso de aprendizaje <br /> en la barra de b&uacute;squeda
            </h3>
        </div>
    </div>
{/if}

<style lang="postcss">
    .results {
        @apply flex w-full flex-col;
    }

    .entry {
        @apply w-full flex-col gap-2 border-b border-b-gray-300 px-4 pb-4 pt-3 dark:border-b-gray-700;
    }
</style>

<script lang="ts">
    import { Badge } from 'flowbite-svelte';

    import { searchTerm, _results } from '$lib/stores/search.store';

    export let form;

    $: results = form?.value;
</script>

{#if results}
    <div class="results">

        <!-- {JSON.stringify($results)} -->

        <br/>
        <p class="mb-4 border-b border-b-gray-300 p-2 dark:border-b-gray-700">
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
                    {entry.unit} - {entry.name}
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
{:else}
    <p class="p-4">No hay resultados para mostrar&hellip;</p>
{/if}

<style lang="postcss">
    .results {
        @apply flex w-full flex-col;
    }

    .entry {
        @apply w-full flex-col gap-2 border-b border-b-gray-300 px-4 pb-4 dark:border-b-gray-700;
    }
</style>

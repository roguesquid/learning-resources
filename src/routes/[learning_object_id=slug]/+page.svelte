<script lang="ts">
    import { A, Badge, Breadcrumb, BreadcrumbItem, Heading, Indicator, P, Spinner } from 'flowbite-svelte';
    import { ClockSolid, DollarOutline, FileCheckOutline } from 'flowbite-svelte-icons';

    import { authorsFilterStore } from '$lib/stores/authors-filter.store';
    import { isLoading } from '$lib/stores/isLoading.store';
    import { languageFilterStore } from '$lib/stores/language-filter.store';
    import { _results, searchTerm } from '$lib/stores/search.store';
    import { sponsorFilterStore } from '$stores/sponsors.store.js';
    import { termFilterStore } from '$stores/term-filter.store.js';

    import type { PageData } from './$types';

    export let data: PageData;

    export let form;

    let results = [];
    $: {
        results = form?.value;
        const authorsFilter = $authorsFilterStore;
        const languageFilter = $languageFilterStore;
        const sponsorFilter = $sponsorFilterStore;
        const termFilter = $termFilterStore;

        //Filtro de autores
        if (authorsFilter.length > 0) {
            results = results?.filter((entry) =>
                authorsFilter.includes(`${entry.author_first_name} ${entry.author_last_name}`),
            );
        }

        //Filtro de idioma
        results = results?.filter((entry) => languageFilter.includes(entry.language));

        //Filtro de Sponsors
        //Como no estoy recibiendo los sponsors en el arreglo de resultados no lo puedo filtrar por ahora
        if (!sponsorFilter.includes('CEL')) {
            results = [];
        }

        // Filtro de TERMS
        results = results?.filter((entry) => termFilter.includes(entry.term_name));

        $isLoading = false;
    }
</script>

<svelte:head>
    <title>H&aacute;bitos y perfil del consumidor editorial</title>
</svelte:head>

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
        <Spinner color="gray" size="8" class="mb-3" />
        <p>Cargando...</p>
    </div>
{:else}
    <article class="mb-6 ml-5 mt-3 flex w-4/5 flex-col">
        <Breadcrumb aria-label="Default breadcrumb example" class="mb-3">
            <BreadcrumbItem href="/" home>B&uacute;squeda</BreadcrumbItem>
            <BreadcrumbItem>Objeto de aprendizaje</BreadcrumbItem>
        </Breadcrumb>

        <span class="mb-1 text-sm">{`${data?.subject_code}: ${data?.subject_name}`}</span>

        <Heading class="mb-2 text-4xl">{`${data.unit} - ${data?.name}`}</Heading>

        <div class="mb-3 flex gap-x-2.5">
            <Badge border color="red">
                <ClockSolid class="me-1.5 h-2.5 w-2.5" />
                {data?.year}
            </Badge>
            <Badge border color="dark">{`${data?.subject_name}`}</Badge>
            {#if data.format}
                <Badge border color="blue">{data?.format}</Badge>
            {/if}
        </div>

        <div class="mb-4 flex gap-x-7">
            <span class="dark:text-white"><strong>Autor: </strong>{`${data?.first_name} ${data?.last_name}`}</span>
            <span class="dark:text-white"><strong>Per&iacute;odo: </strong>{data.term}</span>
        </div>

        <div class="mb-4">
            <Heading tag="h2" class="mb-1 text-2xl">Descripci&oacute;n</Heading>
            <P class="w-4/5">
                {data?.summary}
            </P>
        </div>

        <div class="mb-5">
            <Badge color="{data?.reusable ? 'green' : 'red'}" rounded class="px-2.5 py-0.5">
                <Indicator color="{data?.reusable ? 'green' : 'red'}" size="xs" class="me-1" />{data?.reusable
                    ? 'Reusable'
                    : 'No reusable'}
            </Badge>
            <Badge color="{data?.interactive ? 'green' : 'red'}" rounded class="px-2.5 py-0.5">
                <Indicator color="{data?.interactive ? 'green' : 'red'}" size="xs" class="me-1" />{data?.interactive
                    ? 'Interactivo'
                    : 'No es interactivo'}
            </Badge>
            <Badge color="{data?.has_validation_activities ? 'green' : 'red'}" rounded class="px-2.5 py-0.5">
                <Indicator
                    color="{data?.has_validation_activities ? 'green' : 'red'}"
                    size="xs"
                    class="me-1" />{data?.has_validation_activities
                    ? 'Tiene actividades de validación'
                    : 'No tiene actividades de validación'}
            </Badge>
        </div>

        <div class="flex gap-x-16">
            <div>
                <div class="mb-3 flex">
                    <FileCheckOutline class="mr-1" />
                    <span><strong>Tipo de Recurso: </strong>Ebook</span>
                </div>
                <div class="flex">
                    <DollarOutline class="mr-1" />
                    <span><strong>Sponsor: </strong>Centro de Estudios en L&iacute;nea</span>
                </div>
            </div>
            <div>
                <Heading tag="h3" class="text-xl">Etiquetas</Heading>
                <div class="mt-3 w-72">
                    {#each data?.tagsArray as tag}
                        <Badge border color="dark" class="mb-1 mr-1">{tag}</Badge>
                    {/each}
                </div>
            </div>
        </div>
    </article>
{/if}

<style lang="postcss">
    .results {
        @apply flex w-full flex-col;
    }

    .entry {
        @apply w-full flex-col gap-2 border-b border-b-gray-300 px-4 pb-4 pt-3 dark:border-b-gray-700;
    }
    strong {
        @apply dark:text-white;
    }
</style>

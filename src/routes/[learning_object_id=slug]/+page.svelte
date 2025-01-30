<script lang="ts">
    import { A, Badge, Breadcrumb, BreadcrumbItem, Heading, Indicator, P, Spinner } from 'flowbite-svelte';
    import { ClockSolid, DollarOutline, FileCheckOutline } from 'flowbite-svelte-icons';

    import { isLoading } from '$lib/stores/isLoading.store';
    import { _results, searchTerm } from '$lib/stores/search.store';

    import type { PageData } from './$types';

    export let data: PageData;

    export let form;

    let results = [];
    $: {
        results = form?.value;
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
                <h6>{entry.title}</h6>
                <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    <a class="hover:underline" href="{`http://localhost:5173/${entry.id}`}">
                        {entry.unit} - {entry.name}
                    </a>
                </h5>
                <p class="font-normal leading-tight text-gray-700 dark:text-gray-400">
                    {entry.objective}
                </p>
                <p><b>Autor:</b> {entry.author.join(', ')}</p>
                <!-- Now contains author names -->
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

        <!-- <span class="mb-1 text-sm">{`${data?.subject_name}`}</span> -->

        <Heading class="mb-2 text-4xl">{`${data?.unidad} - ${data?.nombre}`}</Heading>

        <div class="mb-3 flex gap-x-2.5">
            <Badge border color="red">
                <ClockSolid class="me-1.5 h-2.5 w-2.5" />
                {data?.ano}
            </Badge>
            {#if data.formato}
                <Badge border color="blue">{data?.formato}</Badge>
            {/if}
        </div>

        <div class="mb-4 flex gap-x-7">
            <span class="dark:text-white"><strong>Autor: </strong>{`${data.autor}`}</span>
            <span class="dark:text-white"><strong>Per&iacute;odo: </strong>{data.term}</span>
        </div>

        <div class="mb-4">
            <Heading tag="h2" class="mb-1 text-2xl">Descripci&oacute;n</Heading>
            <P class="w-4/5">
                {data?.descripcion_del_recurso}
            </P>
        </div>

        <div class="mb-5">
            <Badge color="{data?.interactivo ? 'green' : 'red'}" rounded class="px-2.5 py-0.5">
                <Indicator color="{data?.interactivo ? 'green' : 'red'}" size="xs" class="me-1" />{data?.interactivo
                    ? 'Reusable'
                    : 'No reusable'}
            </Badge>
            <Badge color="{data?.interactivo ? 'green' : 'red'}" rounded class="px-2.5 py-0.5">
                <Indicator color="{data?.interactivo ? 'green' : 'red'}" size="xs" class="me-1" />{data?.interactivo
                    ? 'Interactivo'
                    : 'No es interactivo'}
            </Badge>
            <Badge color="{data?.actividades_de_validacion ? 'green' : 'red'}" rounded class="px-2.5 py-0.5">
                <Indicator
                    color="{data?.actividades_de_validacion ? 'green' : 'red'}"
                    size="xs"
                    class="me-1" />{data?.actividades_de_validacion
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
                    {#each data?.tags as tag}
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

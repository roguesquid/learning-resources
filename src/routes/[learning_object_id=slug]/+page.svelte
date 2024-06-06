<script lang="ts">
    import { A, Badge, Breadcrumb, BreadcrumbItem, Heading, Indicator, P } from 'flowbite-svelte';
    import { ClockSolid, DollarOutline, FileCheckOutline } from 'flowbite-svelte-icons';

    import type { PageData } from './$types';

    export let data: PageData;
</script>

<svelte:head>
    <title>H&aacute;bitos y perfil del consumidor editorial</title>
</svelte:head>

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

<style lang="postcss">
    strong {
        @apply dark:text-white;
    }
</style>

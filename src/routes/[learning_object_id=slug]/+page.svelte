<script lang="ts">
    import { A, Badge, Breadcrumb, BreadcrumbItem, Heading, Indicator, P } from 'flowbite-svelte';
    import { ClockSolid, DollarOutline, FileCheckOutline } from 'flowbite-svelte-icons';

    import { page } from '$app/stores';

    import type { PageData } from './$types';

    export let data: PageData;

    const learningResourceId = Number($page.params.learning_object_id);
</script>

<svelte:head>
    <title>H&aacute;bitos y perfil del consumidor editorial</title>
</svelte:head>

<article class="mb-6 ml-5 mt-4 flex w-4/5 flex-col">
    <Breadcrumb aria-label="Default breadcrumb example" class="mb-3">
        <BreadcrumbItem href="/" home>B&uacute;squeda</BreadcrumbItem>
        <BreadcrumbItem>Objeto de aprendizaje</BreadcrumbItem>
    </Breadcrumb>

    <span class="mb-1 text-sm">2122-POST-394: Proyecto editorial</span>

    <Heading class="mb-2 text-4xl">U-I Temas 1-3 - H&aacute;bitos y perfil del consumidor editorial</Heading>

    <div class="mb-3 flex gap-x-2.5">
        <Badge border color="red">
            <ClockSolid class="me-1.5 h-2.5 w-2.5" />
            2022
        </Badge>
        <Badge border color="dark">Estudios Literarios</Badge>
        <Badge border color="blue">PDF</Badge>
    </div>

    <div class="mb-4 flex gap-x-7">
        <span class="dark:text-white"><strong>Autor: </strong>Belkis Camacaro</span>
        <span class="dark:text-white"><strong>Per&iacute;odo: </strong>2022-2023</span>
    </div>

    <div class="mb-4">
        <Heading tag="h2" class="text-2xl">Descripci&oacute;n</Heading>
        <P class="w-4/5">
            El mercadeo editorial se fundamenta en conceptos y aspectos clave relacionados con el proceso de mercadeo,
            el conocimiento del mercado y las necesidades, deseos y demanda de los consumidores de productos
            editoriales. <A href="#" class="underline hover:no-underline">Leer Más</A>
        </P>
    </div>

    <div class="mb-5">
        <Badge color="green" rounded class="px-2.5 py-0.5">
            <Indicator color="green" size="xs" class="me-1" />Reusable
        </Badge>
        <Badge color="red" rounded class="px-2.5 py-0.5">
            <Indicator color="red" size="xs" class="me-1" />No es interactivo
        </Badge>
        <Badge color="red" rounded class="px-2.5 py-0.5">
            <Indicator color="red" size="xs" class="me-1" />No tiene actividades de validaci&oacute;n
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
                <Badge border color="dark">Mercado</Badge>
                <Badge border color="dark">Editorial</Badge>
                <Badge border color="dark">Lector</Badge>
                <Badge border color="dark">Libro</Badge>
                <Badge border color="dark">Autor</Badge>
            </div>
        </div>
    </div>
</article>

<style lang="postcss">
    strong {
        @apply dark:text-white;
    }
</style>

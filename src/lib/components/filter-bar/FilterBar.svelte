

            <script>
    import { Accordion, AccordionItem, Heading } from 'flowbite-svelte';
    import { ChevronDoubleDownOutline, ChevronDoubleUpOutline } from 'flowbite-svelte-icons';
    import TagsFilter from './TagsFilter.svelte';
    import AuthorsFilter from './AuthorsFilter.svelte';
    import LanguagesFilter from './LanguagesFilter.svelte';
    import SponsorsFilter from './SponsorsFilter.svelte';
    import TermsFilter from './TermsFilter.svelte';
</script>

        <Heading
            tag="h5"
            id="drawer-label"
            class="px-4 py-2 mb-2 inline-flex items-center text-base font-semibold uppercase text-gray-500 dark:text-gray-400 "
            >Filtros</Heading>

<Accordion multiple flush>
    <AccordionItem class="px-4" paddingFlush="py-2">
        <span slot="header">Palabras Clave</span>
        <div slot="arrowup">
            <ChevronDoubleUpOutline class="-me-0.5 h-3 w-3" />
        </div>
        <span slot="arrowdown">
            <ChevronDoubleDownOutline class="-me-0.5 h-3 w-3" />
        </span>
        <p class="px-4 text-gray-500 dark:text-gray-400">
            <TagsFilter />
        </p>
    </AccordionItem>
    <AccordionItem class="px-4" paddingFlush="py-2">
        <span slot="header">Autores</span>
        <div slot="arrowup">
            <ChevronDoubleUpOutline class="-me-0.5 h-3 w-3" />
        </div>
        <span slot="arrowdown">
            <ChevronDoubleDownOutline class="-me-0.5 h-3 w-3" />
        </span>
        <p class="px-4 text-gray-500 dark:text-gray-400">
            <AuthorsFilter />
        </p>
    </AccordionItem>
    <AccordionItem class="px-4" paddingFlush="py-2">
        <span slot="header">Idiomas</span>
        <div slot="arrowup">
            <ChevronDoubleUpOutline class="-me-0.5 h-3 w-3" />
        </div>
        <span slot="arrowdown">
            <ChevronDoubleDownOutline class="-me-0.5 h-3 w-3" />
        </span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
            <LanguagesFilter />
        </p>
    </AccordionItem>
    <AccordionItem class="px-4" paddingFlush="py-2">
        <span slot="header">Patrocinantes</span>
        <div slot="arrowup">
            <ChevronDoubleUpOutline class="-me-0.5 h-3 w-3" />
        </div>
        <span slot="arrowdown">
            <ChevronDoubleDownOutline class="-me-0.5 h-3 w-3" />
        </span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
            <SponsorsFilter />
        </p>
    </AccordionItem>
    <AccordionItem class="px-4" paddingFlush="py-2">
        <span slot="header">Períodos</span>
        <div slot="arrowup">
            <ChevronDoubleUpOutline class="-me-0.5 h-3 w-3" />
        </div>
        <span slot="arrowdown">
            <ChevronDoubleDownOutline class="-me-0.5 h-3 w-3" />
        </span>
        <p class="mb-2 text-gray-500 dark:text-gray-400">
            <TermsFilter />
        </p>
    </AccordionItem>
</Accordion>

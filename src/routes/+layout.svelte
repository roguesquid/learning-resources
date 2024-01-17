<script lang="ts">
    import '../app.postcss';

    import AppHeader from '$components/AppHeader.svelte';
    import FilterBar from '$components/filter-bar/FilterBar.svelte';
    import SearchBar from '$components/SearchBar.svelte';

</script>

<div class="app-container">
    <header class="app-header">
        <AppHeader title="Catálogo de Objetos de Aprendizaje" />
        <SearchBar />
    </header>
    <aside class="app-sidebar">
        <FilterBar />
    </aside>
    <main class="app-main-content">
        <slot />
    </main>
</div>

<style lang="postcss">
    .app-container {
        @apply grid h-full w-full grid-flow-row-dense content-center justify-center justify-items-start gap-0;

        grid-template-columns: 20rem 1fr;
        grid-template-rows: 9rem 1fr;
        grid-template-areas:
            'app-header app-header'
            'app-sidebar app-main-content';
    }

    .app-header {
        grid-area: app-header;
        @apply w-full self-stretch;
    }

    .app-sidebar {
        grid-area: app-sidebar;
        @apply w-full self-stretch overflow-y-auto border-r border-r-gray-300 pt-1 scrollbar scrollbar-track-zinc-200 scrollbar-thumb-zinc-400 scrollbar-corner-zinc-300 dark:border-r-gray-700 dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-600 dark:scrollbar-corner-slate-700;
    }

    .app-main-content {
        grid-area: app-main-content;
        @apply w-full self-stretch overflow-y-auto pt-1 scrollbar scrollbar-track-zinc-200 scrollbar-thumb-zinc-400 scrollbar-corner-zinc-300 dark:scrollbar-track-slate-800 dark:scrollbar-thumb-slate-600 dark:scrollbar-corner-slate-700;
    }
</style>

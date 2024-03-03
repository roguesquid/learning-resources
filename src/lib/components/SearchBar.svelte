<script lang="ts">
    import { Button, Search } from 'flowbite-svelte';
    import { SearchOutline } from 'flowbite-svelte-icons';

    import { enhance } from '$app/forms';

    import { searchTerm } from '$lib/stores/search.store';
</script>

<nav class="searchbar">
    <form class="searchbar-form" method="post" action="?/search" use:enhance>
        <Search
            size="md"
            class="w-96"
            placeholder="Buscar recurso de aprendizaje"
            name="search"
            bind:value="{$searchTerm}" />
        <Button type="submit" class="!p-2.5">
            <SearchOutline class="h-4 w-5 outline-none" />
        </Button>
    </form>
</nav>

<style lang="postcss">
    .searchbar {
        @apply flex h-full w-full flex-col items-start justify-center border-b border-b-gray-300 px-4 dark:border-b-gray-700;
    }

    .searchbar-form {
        @apply flex w-96 gap-2;
    }
</style>

<script lang="ts">
    import { DarkMode, Navbar, NavBrand } from 'flowbite-svelte';

    export let title: string = 'Universidad Católica Andrés Bello';
</script>

<!-- <div class="relative"> -->
<Navbar class="w-full border-b border-b-gray-300 p-4 dark:bg-gray-800" fluid="{true}">
    <NavBrand href="/">
        <img
            src="/images/ucab.svg"
            class="mr-3 h-6 sm:h-9"
            alt="Universidad Católica Andrés Bello | Centro de Estudios en Línea" />
        <span class="self-center whitespace-nowrap text-2xl font-bold dark:text-white">{title}</span>
    </NavBrand>
    <div class="flex">
        <DarkMode
            class="ml-2 inline-flex h-8 w-8 items-center justify-center rounded-lg text-sm focus:ring-2 focus:ring-gray-200 dark:focus:ring-gray-700" />
    </div>
</Navbar>

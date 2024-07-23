<script lang="ts">
    import { Checkbox } from 'flowbite-svelte';

    import { termFilterStore } from '$stores/term-filter.store';

    // Añado por defecto los dos terms
    $termFilterStore = [...$termFilterStore, '2022-2023', '2023-2024'];

    function toggleTerm(term: string, event: Event) {
        let checkbox = event.target as HTMLInputElement;
        if (checkbox.checked && !$termFilterStore.includes(term)) {
            $termFilterStore = [...$termFilterStore, term];
        } else if (!checkbox.checked && $termFilterStore.includes(term)) {
            $termFilterStore = $termFilterStore.filter((l) => l !== term);
        }
    }
</script>

<section class="filter-content">
    <Checkbox checked on:change="{(e) => toggleTerm('2022-2023', e)}">2022-2023</Checkbox>
    <Checkbox checked on:change="{(e) => toggleTerm('2023-2024', e)}">2023-2024</Checkbox>
</section>

<style lang="postcss">
    .filter-content {
        @apply px-4;
    }
</style>

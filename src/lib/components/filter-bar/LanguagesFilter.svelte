<script lang="ts">
    import { Checkbox } from 'flowbite-svelte';

    import { languageFilterStore } from '$stores/language-filter.store';

    // Por defecto siempre pone el español porque sino aparece vacía la búsqueda
    $languageFilterStore = [...$languageFilterStore, 'Español'];

    function toggleLanguage(lang: string, event: Event) {
        let checkbox = event.target as HTMLInputElement;
        if (checkbox.checked && !$languageFilterStore.includes(lang)) {
            $languageFilterStore = [...$languageFilterStore, lang];
        } else if (!checkbox.checked && $languageFilterStore.includes(lang)) {
            $languageFilterStore = $languageFilterStore.filter((l) => l !== lang);
        }
    }
</script>

<section class="filter-content">
    <Checkbox checked on:change="{(e) => toggleLanguage('Español', e)}">Español</Checkbox>
    <Checkbox on:change="{(e) => toggleLanguage('Inglés', e)}">Inglés</Checkbox>
</section>

<style lang="postcss">
    .filter-content {
        @apply px-4;
    }
</style>

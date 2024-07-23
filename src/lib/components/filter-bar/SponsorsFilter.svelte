<script lang="ts">
    import { Checkbox } from 'flowbite-svelte';

    import { sponsorFilterStore } from '$stores/sponsors.store';

    // Por defecto siempre pone el cel porque sino aparece vacía la búsqueda
    $sponsorFilterStore = [...$sponsorFilterStore, 'CEL'];

    function toggleSponsor(sponsor: string, event: Event) {
        let checkbox = event.target as HTMLInputElement;
        if (checkbox.checked && !$sponsorFilterStore.includes(sponsor)) {
            $sponsorFilterStore = [...$sponsorFilterStore, sponsor];
        } else if (!checkbox.checked && $sponsorFilterStore.includes(sponsor)) {
            $sponsorFilterStore = $sponsorFilterStore.filter((l) => l !== sponsor);
        }
    }
</script>

<section class="filter-content">
    <Checkbox checked on:change="{(e) => toggleSponsor('CEL', e)}">Centro de Estudios en Línea</Checkbox>
</section>

<style lang="postcss">
    .filter-content {
        @apply px-4;
    }
</style>

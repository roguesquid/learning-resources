<script lang="ts">
    import { Checkbox } from 'flowbite-svelte';
</script>

<section class="filter-content">
    <Checkbox checked>Español</Checkbox>
    <Checkbox>Inglés</Checkbox>
</section>

<style lang="postcss">
    .filter-content {
        @apply px-4;
    }
</style>

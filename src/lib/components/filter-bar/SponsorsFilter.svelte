<script lang="ts">
    import { onMount } from 'svelte';

    import { Checkbox } from 'flowbite-svelte';

    import { sponsorFilterStore } from '$stores/sponsors.store';

    let sponsors = [];

    const load = async () => {
        const response = await fetch('http://localhost:8000/wp-json/wp/v2/sponsor?_fields=name,id');

        const data = await response.json();

        sponsors = data?.map((sponsor) => ({ value: sponsor.id, name: sponsor.name.toLocaleUpperCase() })) ?? [];
        $sponsorFilterStore = sponsors.map((sponsor) => String(sponsor.value));
    };
    onMount(() => {
        load();
    });

    function handleCheckboxChange(event) {
        const { checked, value } = event.target;
        if (checked) {
            $sponsorFilterStore = [...$sponsorFilterStore, value];
        } else {
            $sponsorFilterStore = $sponsorFilterStore.filter((sponsor) => sponsor !== value);
        }
    }
</script>

<section class="filter-content">
    {#each sponsors as sponsor}
        <Checkbox value="{sponsor.value}" checked on:change="{handleCheckboxChange}">
            {sponsor.name}
        </Checkbox>
    {/each}
</section>

<style lang="postcss">
    .filter-content {
        @apply px-4;
    }
</style>

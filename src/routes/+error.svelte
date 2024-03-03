<script lang="ts">
    import { page } from '$app/stores';
</script>

<div class="flex h-full flex-col items-center justify-center">
    <!-- <h1>{$page.status}: {$page.error?.message}</h1> -->
    <strong class="mb-2 text-5xl dark:text-slate-50">{$page.status}</strong>
    <span>
        {#if $page.status == 404}
            Perdon, no pudimos encontrar la p&aacutegina que estabas buscando
        {/if}
    </span>
</div>

<style>
</style>

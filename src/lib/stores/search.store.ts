import {
    derived,
    writable,
} from 'svelte/store';

export const searchTerm = writable();

export const tagsFilter = writable([]);

export const _results = derived(
    [tagsFilter, searchTerm],
    ([$tagsFilter, $searchTerm], set) => {
        const timeoutId = setTimeout(() => {
            return set({
                tagsFilter: $tagsFilter,
                term: $searchTerm,
            });
        }, 600);

        return () => clearTimeout(timeoutId);
    },
    {},
);

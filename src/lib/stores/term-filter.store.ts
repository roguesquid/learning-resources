import { writable, type Writable } from 'svelte/store';

function termFilterStoree(): Writable<string[]> {
    const store = writable<string[]>([]);

    const set = (value: string[]) => {
        store.set(value);
    };

    return {
        subscribe: store.subscribe,
        set,
        update: () => {},
    };
}

export const termFilterStore = termFilterStoree();

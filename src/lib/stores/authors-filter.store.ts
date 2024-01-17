import { writable, type Writable } from 'svelte/store';

export function authorsFilterStore(): Writable<string[]> {
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

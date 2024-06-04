import { writable, type Writable } from 'svelte/store';

export function authorsFilterStoree(): Writable<string[]> {
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

export const authorsFilterStore = authorsFilterStoree();

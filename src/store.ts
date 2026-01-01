import { atom } from 'nanostores';

export const curr = atom<number | null>(null);
export const selected = atom(0);
export const $ = (identifier: string): HTMLElement | null => document.querySelector(identifier);
export const $$ = (identifier: string): NodeList => document.querySelectorAll(identifier);

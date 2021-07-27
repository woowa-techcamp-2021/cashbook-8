export const $ = (identifier: string) => document.querySelector(identifier) as HTMLElement;
export const $$ = (identifier: string) => document.querySelectorAll(identifier);

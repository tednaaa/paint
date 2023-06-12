import { createEvent, createStore } from 'effector';

export const changeColor = createEvent<string>();
export const changeLineWidth = createEvent<string>();

export const $color = createStore('#000000').on(changeColor, (_, color) => color);
export const $lineWidth = createStore('0').on(changeLineWidth, (_, lineWidth) => lineWidth);

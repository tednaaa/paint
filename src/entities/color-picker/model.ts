import { createApi, createStore } from 'effector';

export const $color = createStore<string>('#000000');

export const { setColor } = createApi($color, {
  setColor: (_, newColor: string) => newColor,
});

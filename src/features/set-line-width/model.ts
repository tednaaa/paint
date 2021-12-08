import { createApi, createStore } from 'effector';

export const $lineWidth = createStore<number>(1);

export const { setLineWidth } = createApi($lineWidth, {
  setLineWidth: (_, newLineWidth: number) => newLineWidth,
});

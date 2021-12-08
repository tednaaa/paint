import { createApi, createStore } from 'effector';
import { ITool } from '../lib/tools/tool';

export const $canvas = createStore<HTMLCanvasElement>(null);

export const { setCanvas } = createApi($canvas, {
  setCanvas: (_, canvas: HTMLCanvasElement) => canvas,
});

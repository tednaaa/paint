import { createApi, createStore } from 'effector';
import { ITool } from '../lib/tools/tool';

export const $tool = createStore<ITool>(null);

export const { setTool } = createApi($tool, {
  setTool: (_, newTool: ITool) => newTool,
});

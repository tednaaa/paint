import { toolState } from '../../store';

export const setDrawColor = (color: string) => {
  toolState.setStrokeColor(color);
  toolState.setFillColor(color);
};

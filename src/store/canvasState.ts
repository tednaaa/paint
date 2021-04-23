import { makeAutoObservable } from 'mobx';

class CanvasState {
  canvas = null;

  constructor() {
    makeAutoObservable(this);
  }

  setCanvas(canvas: any) {
    this.canvas = canvas;
  }
}

export default new CanvasState();

import { makeAutoObservable } from 'mobx';
import { loadImage } from '../utils/loadImage';

class CanvasState {
  canvas: HTMLCanvasElement = null!;
  undoList: string[] = [];
  redoList: string[] = [];
  username: string = '';

  constructor() {
    makeAutoObservable(this);
  }

  setUsername(username: string) {
    this.username = username;
  }

  setCanvas(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
  }

  pushToUndo(image: string) {
    this.undoList.push(image);
  }

  pushToRedo(image: string) {
    this.redoList.push(image);
  }

  undo() {
    if (this.undoList.length) {
      const dataUrl = this.undoList.pop();

      this.pushToRedo(this.canvas.toDataURL());

      loadImage(dataUrl, this.canvas);
    } else {
      const ctx = this.canvas.getContext('2d');

      ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }

  redo() {
    if (this.redoList.length) {
      const dataUrl = this.redoList.pop();

      this.pushToUndo(this.canvas.toDataURL());

      loadImage(dataUrl, this.canvas);
    }
  }
}

export const canvasState = new CanvasState();

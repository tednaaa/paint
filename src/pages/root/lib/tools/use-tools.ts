import { useCallback, useEffect, useState } from 'react';

import { Tool } from './tool';
import { brushTool } from './brush';
import { rectangleTool } from './rectangle';
import { circleTool } from './circle';
import { eraserTool } from './eraser';
import { lineTool } from './line';

export const useTools = (canvas: HTMLCanvasElement) => {
  const [currentTool, setCurrentTool] = useState<Tool>(brushTool);

  useEffect(() => {
    if (!canvas || !currentTool) return;

    currentTool.setup(canvas);

    const startDraw = (event: MouseEvent | TouchEvent) => currentTool.startDraw(event);
    const draw = (event: MouseEvent | TouchEvent) => currentTool.draw(event);
    const endDraw = () => currentTool.endDraw();

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('touchstart', startDraw);

    canvas.addEventListener('touchmove', draw);
    canvas.addEventListener('mousemove', draw);

    canvas.addEventListener('mouseleave', endDraw);
    canvas.addEventListener('mouseup', endDraw);
    canvas.addEventListener('touchend', endDraw);

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('touchstart', startDraw);

      canvas.removeEventListener('touchmove', draw);
      canvas.removeEventListener('mousemove', draw);

      canvas.removeEventListener('mouseleave', endDraw);
      canvas.removeEventListener('mouseup', endDraw);
      canvas.removeEventListener('touchend', endDraw);
    };
  }, [canvas, currentTool]);

  return {
    currentTool,
    setCurrentTool,
  };
};

export const tools = [
  {
    instance: brushTool,
    iconSource: require('@/shared/images/icons/brush.svg'),
  },
  {
    instance: rectangleTool,
    iconSource: require('@/shared/images/icons/rectangle.svg'),
  },
  {
    instance: circleTool,
    iconSource: require('@/shared/images/icons/circle.svg'),
  },
  {
    instance: eraserTool,
    iconSource: require('@/shared/images/icons/eraser.svg'),
  },
  {
    instance: lineTool,
    iconSource: require('@/shared/images/icons/line.svg'),
  },
];

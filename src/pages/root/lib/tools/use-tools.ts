import { useEffect, useState } from 'react';

import { Tool } from './types';
import { brushTool } from './brush';
import { rectangleTool } from './rectangle';
import { circleTool } from './circle';
import { eraserTool } from './eraser';
import { lineTool } from './line';

export const useTools = (canvas: HTMLCanvasElement) => {
  const [context, setContext] = useState<CanvasRenderingContext2D>();
  const [currentTool, setCurrentTool] = useState<Tool>(brushTool);

  useEffect(() => {
    if (!canvas || !currentTool) return;

    setContext(canvas.getContext('2d'));

    const startDraw = (event: MouseEvent) => currentTool.startDraw(event, context);
    const draw = (event: MouseEvent) => currentTool.draw(event, context, canvas);
    const endDraw = (event: MouseEvent) => currentTool.endDraw(event, context);

    canvas.addEventListener('mousedown', startDraw);
    canvas.addEventListener('mousemove', draw);
    canvas.addEventListener('mouseleave', endDraw);
    canvas.addEventListener('mouseup', endDraw);

    return () => {
      canvas.removeEventListener('mousedown', startDraw);
      canvas.removeEventListener('mousemove', draw);
      canvas.removeEventListener('mouseleave', endDraw);
      canvas.removeEventListener('mouseup', endDraw);
    };
  }, [canvas, currentTool, context]);

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

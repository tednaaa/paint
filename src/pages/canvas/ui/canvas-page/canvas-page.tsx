import React from 'react';
import { $color } from '@/entities/color-picker';
import { $lineWidth } from '@/features/set-line-width';
import { ToolBar } from '../tool-bar/tool-bar';
import { SettingsBar } from '../settings-bar/settings-bar';
import { Canvas } from '../canvas/canvas';
import { $tool } from '../../model/tool.model';

$lineWidth.watch((lineWidth) => {
  const tool = $tool.getState();
  if (tool) tool.lineWidth = lineWidth;
});
$color.watch((color) => {
  const tool = $tool.getState();
  if (tool) tool.color = color;
});

export const CanvasPage = () => {
  return (
    <>
      <ToolBar />
      <SettingsBar />
      <Canvas />
    </>
  );
};

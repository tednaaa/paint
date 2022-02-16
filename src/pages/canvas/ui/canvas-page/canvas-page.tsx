import React from 'react';
import { $lineWidth } from '@/features/set-line-width';
import { $color } from '@/entities/color-picker';
import { $tool } from '../../model/tool.model';
import { Canvas } from '../canvas/canvas';
import { SettingsBar } from '../settings-bar/settings-bar';
import { ToolBar } from '../tool-bar/tool-bar';

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

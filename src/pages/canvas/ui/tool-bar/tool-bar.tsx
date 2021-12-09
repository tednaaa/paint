import React, { FC } from 'react';
import { useStore } from 'effector-react';
import { useImageId } from '@/shared/lib/hooks';
import { UndoCanvasButton } from '@/features/undo-canvas';
import { RedoCanvasButton } from '@/features/redo-canvas';
import { DownloadCanvasImageButton } from '@/features/download-canvas-image';
import { ColorPicker } from '@/entities/color-picker';
import { $canvas } from '../../model/canvas.model';
import { toolButtons } from '../../lib/toolButtons';
import { handleToolSelect } from '../../lib/handleToolSelect';
import styles from './tool-bar.module.scss';

export const ToolBar: FC = () => {
  const canvas = useStore($canvas);
  const imageId = useImageId();

  return (
    <div className={styles.toolBar}>
      <div className={styles.toolBarLeft}>
        {toolButtons.map(({ imageSource, title }) => {
          return (
            <button onClick={() => handleToolSelect({ title, canvas })} title={title} key={title}>
              <img className={styles.toolImage} src={imageSource} alt="" />
            </button>
          );
        })}
        <ColorPicker className={styles.colorPicker} />
      </div>
      <div className={styles.toolBarRight}>
        <UndoCanvasButton />
        <RedoCanvasButton />
        <DownloadCanvasImageButton canvas={canvas} imageId={imageId} />
      </div>
    </div>
  );
};

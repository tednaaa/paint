import React, { FC } from 'react';

import { DownloadButton } from '@/shared/ui/download-button';
import { downloadCanvasImage } from '@/shared/lib/canvas';

import { tools, useTools } from '../../lib/tools';

import { Tool } from './tool';
import { ColorPicker } from './color-picker';

import styles from './tool-bar.module.scss';

interface Props {
  canvas: HTMLCanvasElement;
}

export const ToolBar: FC<Props> = ({ canvas }) => {
  const { currentTool, setCurrentTool } = useTools(canvas);

  const downloadImage = () => downloadCanvasImage(canvas);

  return (
    <div className={styles.toolBar}>
      <div className={styles.toolBarLeft}>
        <ul className={styles.toolsList}>
          {tools.map(({ iconSource, instance }) => {
            return (
              <Tool
                key={instance.title}
                title={instance.title}
                iconSource={iconSource}
                active={currentTool?.title === instance.title}
                onClick={() => setCurrentTool(instance)}
              />
            );
          })}
        </ul>

        <ColorPicker className={styles.colorPicker} />
      </div>
      <div className={styles.toolBarRight}>
        <DownloadButton onClick={downloadImage} />
      </div>
    </div>
  );
};

import { useStore } from 'effector-react';
import React, { FC } from 'react';
import { downloadCanvasImage } from '../lib';
import styles from './button.module.scss';

interface Props {
  canvas: HTMLCanvasElement;
  imageId: string;
}

export const Button: FC<Props> = ({ canvas, imageId }) => {
  return (
    <button onClick={() => downloadCanvasImage(canvas, imageId)} title="download">
      <img className={styles.buttonImage} src={require('@/shared/images/icons/download.svg')} alt="" />
    </button>
  );
};

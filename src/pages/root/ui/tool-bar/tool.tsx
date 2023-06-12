import React, { FC, MouseEventHandler } from 'react';

import styles from './tool-bar.module.scss';
import clsx from 'clsx';

interface Props {
  title: string;
  iconSource: string;
  active: boolean;
  onClick: MouseEventHandler<HTMLButtonElement>;
}

export const Tool: FC<Props> = ({ title, iconSource, active, onClick }) => {
  return (
    <button className={clsx(styles.tool, active && styles.toolActive)} title={title} onClick={onClick}>
      <img className={styles.toolImage} src={iconSource} alt={title} />
    </button>
  );
};

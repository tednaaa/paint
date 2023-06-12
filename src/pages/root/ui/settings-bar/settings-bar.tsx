import React, { ChangeEvent, FC } from 'react';
import { useStore } from 'effector-react';

import { $lineWidth, changeLineWidth } from '../../model';

import styles from './settings-bar.module.scss';

export const SettingsBar: FC = () => {
  const lineWidth = useStore($lineWidth);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => changeLineWidth(event.currentTarget.value);

  return (
    <div className={styles.settingsBar}>
      <input className={styles.input} type="range" min="0" max="50" value={lineWidth} onChange={handleInputChange} />
    </div>
  );
};

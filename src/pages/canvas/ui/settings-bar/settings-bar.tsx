import React, { FC } from 'react';
import { LineWidthInput } from '@/features/set-line-width';
import styles from './settings-bar.module.scss';

export const SettingsBar: FC = () => {
  return (
    <div className={styles.settingsBar}>
      <LineWidthInput />
    </div>
  );
};

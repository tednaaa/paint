import { useStore } from 'effector-react';
import React, { ChangeEvent } from 'react';
import { $lineWidth, setLineWidth } from '../../model';
import styles from './input.module.scss';

export const Input = () => {
  const lineWidth = useStore($lineWidth);

  const handleLineWidthChange = (event: ChangeEvent<HTMLInputElement>) => {
    setLineWidth(parseInt(event.currentTarget.value));
  };

  return (
    <label className={styles.lineWidthLabel}>
      <span className={styles.lineWidthLabelText}>Line width</span>
      <input
        min={1}
        max={30}
        value={lineWidth}
        onChange={handleLineWidthChange}
        className={styles.lineWidthInput}
        type="range"
      />
      {lineWidth}
    </label>
  );
};

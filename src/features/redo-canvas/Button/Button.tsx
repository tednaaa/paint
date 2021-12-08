import React from 'react';
import styles from './Button.module.scss';

export const Button = () => {
  return (
    <button title="redo">
      <img
        className={styles.buttonImage}
        src={require('@/shared/images/icons/redo.svg')}
        alt=""
      />
    </button>
  );
};

import React from 'react';
import styles from './Button.module.scss';

export const Button = () => {
  return (
    <button title="undo">
      <img
        className={styles.buttonImage}
        src={require('@/shared/images/icons/undo.svg')}
        alt=""
      />
    </button>
  );
};

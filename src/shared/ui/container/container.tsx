import React, { FC } from 'react';
import styles from './container.module.scss';

export const Container: FC = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

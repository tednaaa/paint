import clsx from 'clsx';
import React, { FC } from 'react';
import styles from './button.module.scss';

interface Props {
  className?: string;
}

export const Button: FC<Props> = ({ className, children }) => {
  return <button className={clsx(styles.button, className)}>{children}</button>;
};

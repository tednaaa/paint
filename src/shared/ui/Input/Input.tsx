import clsx from 'clsx';
import React, { FC, InputHTMLAttributes } from 'react';
import styles from './Input.module.scss';

interface Props extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export const Input: FC<Props> = (props) => {
  return <input className={clsx(styles.input, props.className)} {...props} />;
};

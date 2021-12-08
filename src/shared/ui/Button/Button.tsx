import clsx from 'clsx';
import React, { ButtonHTMLAttributes, FC } from 'react';
import styles from './Button.module.scss';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const Button: FC<Props> = (props) => {
  return (
    <button className={clsx(styles.button, props.className)} {...props}>
      {props.children}
    </button>
  );
};

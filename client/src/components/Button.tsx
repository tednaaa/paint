import { ButtonHTMLAttributes, FC } from 'react';
import '../styles/button.scss';

type Props = {
  text: string;
  className: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<Props> = ({ text, className, ...props }) => {
  return (
    <button {...props} className={`button ${className}`}>
      {text}
    </button>
  );
};

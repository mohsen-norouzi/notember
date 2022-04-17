import clsx from 'clsx';
import React, { FC, ButtonHTMLAttributes } from 'react';
import './SquareButton.css';

export const SquareButton: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({
  children,
  className,
  ...props
}) => {
  return (
    <button className={clsx('square-button', className)} {...props}>
      {children}
    </button>
  );
};

import { FC } from 'react';
import './VerticalButtons.css';
import clsx from 'clsx';

interface Props {
  className?: string;
}

export const VerticalButtons: FC<Props> = ({ children, className, ...props }) => {
  return <div className={clsx('vertical-buttons', className)}>{children}</div>;
};

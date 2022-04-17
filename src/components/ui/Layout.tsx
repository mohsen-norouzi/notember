import { FC } from 'react';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: FC<LayoutProps> = (props) => {
  return (
    <div className='bg-gray-100'>
      {props.children}
    </div>
  );
};

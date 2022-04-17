import { FC } from 'react';

export const Layout: FC = (props) => {
  return (
    <div className='bg-gray-100 '>
      {props.children}
    </div>
  );
};

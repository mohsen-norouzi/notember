import { Container } from '@mui/material';
import { FC } from 'react';

export const Layout: FC = (props) => {
  return (
    <Container maxWidth='xl' className='bg-gray-100 h-screen p-5'>
      {props.children}
    </Container>
  );
};

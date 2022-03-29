import { Box } from '@mui/system';
import { FC } from 'react';
import { AppbarLayout } from './AppbarLayout';

export const Layout: FC = (props) => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppbarLayout />
      {props.children}
    </Box>
  );
};

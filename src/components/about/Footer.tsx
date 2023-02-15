import { PaletteMode } from '@mui/material';
import { Box } from '@mui/system';
import { FC } from 'react';

type FooterProps = {
  mode: PaletteMode;
};

export const Footer: FC<FooterProps> = (props) => {
  return (
    <Box
      component='div'
      className='flex items-center justify-around gap-5 py-20 bg-sky-100 mt-5'
      sx={{ bgcolor: props.mode === 'light' ? '' : '#1A202C' }}
    ></Box>
  );
};

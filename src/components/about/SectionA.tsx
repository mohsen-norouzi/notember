import { PaletteMode, Typography } from '@mui/material';
import { Box } from '@mui/system';

import image1 from 'assets/images/ideas_flow.svg';
import { FC } from 'react';

type SectionAProps = {
  mode: PaletteMode;
};

export const SectionA: FC<SectionAProps> = (props) => {
  return (
    <Box
      component='div'
      className='flex items-center justify-around gap-5 py-20 mb-5 bg-indigo-100 mt-24'
      sx={{ bgcolor: props.mode === 'light' ? '' : 'indigo' }}
    >
      <div className='flex flex-col max-w-32 flex-wrap'>
        <Typography variant='h3' className='flex-wrap' color='text.primary'>
          Note <br />
          When The <span className='text-indigo-500'>Idea</span> Flows!
        </Typography>

        <Typography className='!mt-5 font-roboto !font-light' variant='h6' color='text.secondary'>
          Add your daily notes easily and delightfully with the most advanced tools. <br />
          It's been never this fast and easy!
        </Typography>
      </div>

      <div className='flex items-center max-h-72'>
        <img src={image1} className='w-auto max-h-72' />
      </div>
    </Box>
  );
};

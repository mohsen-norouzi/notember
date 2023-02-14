import { Button, PaletteMode, Typography } from '@mui/material';
import { Box } from '@mui/system';

import image1 from 'assets/images/ideas_flow.svg';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'redux/hooks';

type SectionAProps = {
  mode: PaletteMode;
};

export const SectionA: FC<SectionAProps> = (props) => {
  const authenticated = useAppSelector((state) => state.user.authenticated);
  const navigate = useNavigate();

  const handleGoToNotes = () => {
    if (authenticated) {
      return navigate('/notes');
    }

    return navigate('/register');
  };

  return (
    <Box
      component='div'
      className='flex flex-col-reverse justify-center items-center p-5 md:flex-row md:items-center md:justify-around gap-5 py-20 mb-5 bg-indigo-100 mt-24'
      sx={{ bgcolor: props.mode === 'light' ? '' : '#1A202C' }}
    >
      <Box component='div' className='flex flex-col max-w-32 flex-wrap'>
        <Typography variant='h3' className='flex-wrap' color='text.primary'>
          Note! <br />
          When The <span className='text-indigo-500'>Idea</span> Flows!
        </Typography>

        <Typography className='!mt-5 font-roboto !font-light' variant='h6' color='text.secondary'>
          Add your daily notes easily and delightfully with the most advanced tools. <br />
          It's been never this fast and easy!
        </Typography>

        <Box component='div' className='flex flex-col justify-start items-start gap-2 mt-10'>
          <Button variant='outlined' size='large' onClick={handleGoToNotes}>
            Start taking notes
          </Button>
        </Box>
      </Box>

      <div className='flex items-center max-h-72'>
        <img src={image1} className='w-auto max-h-72' />
      </div>
    </Box>
  );
};

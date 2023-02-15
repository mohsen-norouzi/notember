import { Icon, Typography } from '@mui/material';
import { Box } from '@mui/system';

export const Features = () => {
  return (
    <Box component='div' className='mt-24'>
      <div className='flex flex-col items-center'>
        <Typography variant='h5' className='text-sky-400 !font-mono'>
          - why so special? -
        </Typography>

        <Typography variant='h3' className='!mt-5' color='text.primary'>
          Exclusive <span className='text-sky-500'>Features</span>
        </Typography>

        <Typography
          className='!mt-5 text-gray-600 font-roboto !font-light text-center'
          variant='h6'
        >
          Special features created just for you! <br />
          With our features you can manage your notes better and faster!
        </Typography>
      </div>

      <div className='flex flex-col items-center justify-items-stretch mt-20 mb-20'>
        <div className='flex flex-col md:flex-row md:items-center md:justify-center h-full'>
          <div className='flex flex-col gap-2 items-center justify-center p-28 border-b'>
            <Icon fontSize='large' className='text-sky-500 !text-6xl mb-2'>
              speed
            </Icon>
            <Typography variant='h5' color='text.primary'>
              Super Fast
            </Typography>
            <Typography
              className='!mt-5 font-roboto !font-light text-center flex-wrap max-w-lg'
              variant='h6'
              color='text.secondary'
            >
              We're using the latest technologies to bring you the fastest note app
            </Typography>
          </div>

          <div className='flex flex-col gap-2 items-center justify-center p-28 border-0 md:border-l border-b'>
            <Icon fontSize='large' className='text-sky-500 !text-6xl mb-2'>
              cake
            </Icon>
            <Typography variant='h5' color='text.primary'>
              Easy to use
            </Typography>
            <Typography
              className='!mt-5 font-roboto !font-light text-center flex-wrap max-w-lg'
              variant='h6'
              color='text.secondary'
            >
              No documentation is needed since everything here is crystal clear!
            </Typography>
          </div>
        </div>

        <div className='flex flex-col md:flex-row md:items-center md:justify-center h-full '>
          <div className='flex flex-col gap-2 items-center justify-center p-28  border-b md:border-b-0 md:border-r'>
            <Icon fontSize='large' className='text-sky-500 !text-6xl mb-2'>
              local_offer
            </Icon>
            <Typography variant='h5' color='text.primary'>
              Dirt Cheap
            </Typography>
            <Typography
              className='!mt-5 font-roboto !font-light text-center flex-wrap max-w-lg'
              variant='h6'
              color='text.secondary'
            >
              Everything here is free for now. After adding new features that will be Dirt Cheap for
              NEW users only!
            </Typography>
          </div>

          <div className='flex flex-col gap-2 items-center justify-center p-28'>
            <Icon fontSize='large' className='text-sky-500 !text-6xl mb-2'>
              palette
            </Icon>
            <Typography variant='h5' color='text.primary'>
              Modern UI
            </Typography>
            <Typography
              className='!mt-5 font-roboto !font-light text-center flex-wrap max-w-lg'
              variant='h6'
              color='text.secondary'
            >
              We don't want to make a good website. We want to make it super amazing!
            </Typography>
          </div>
        </div>
      </div>
    </Box>
  );
};

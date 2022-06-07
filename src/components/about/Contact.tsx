import { Box } from '@mui/system';
import { Avatar, Icon, Link, Typography } from '@mui/material';

import githubImage from 'assets/images/github.svg';
import linkedImage from 'assets/images/linkedin.svg';
import mailImage from 'assets/images/email.png';

export const Contact = () => {
  return (
    <Box component='div' className='mt-24'>
      <div className='flex flex-col items-center'>
        <Typography variant='h3' className='!mt-5' color='text.primary'>
          Get <span className='text-indigo-500'>in</span> touch
        </Typography>

        <div className='flex flex-col items-center justify-items-stretch  relative'>
          <div className='flex items-center justify-center h-full '>
            <div className='flex flex-col gap-2 items-center justify-center p-16 '>
              <Avatar
                src='https://avatars.githubusercontent.com/u/39644186?v=4'
                className='mb-5'
                sx={{ width: 128, height: 128 }}
              />

              <Typography variant='h5' color='text.primary'>
                Hey there, I'm <span className='text-indigo-500'>Mohsen</span>.
              </Typography>
              <Typography
                className='!mt-5 text-gray-600 font-roboto !font-light text-center flex-wrap'
                variant='h6'
                color='text.secondary'
              >
                Thanks for using notember. Please feel free to reach out to me!
              </Typography>

              <Box component='div' className='flex gap-10 my-10 items-end justify-center'>
                <Link href='https://www.linkedin.com/in/mohsen-norouzi/' target='_blank'>
                  <img
                    src={linkedImage}
                    height='48'
                    width='48'
                    className='transition hover:scale-105'
                  />
                </Link>

                <Link href='https://www.github.com/mohsen-norouzi/' target='_blank'>
                  <img
                    src={githubImage}
                    height='48'
                    width='48'
                    className='transition hover:scale-105'
                  />
                </Link>

                <Link href='mailto:mohsen.norouzi@live.com' target='_blank'>
                  <img
                    src={mailImage}
                    height='48'
                    width='48'
                    className='transition hover:scale-105'
                  />
                </Link>
              </Box>

              <Box className='absolute bottom-5'>
                <Typography
                  variant='h6'
                  color='text.primary'
                  className='!mt-5 !font-light text-center flex-wrap flex items-center gap-2'
                >
                  made with{' '}
                  <Icon color='error' className='animated pulse infinite'>
                    favorite
                  </Icon>{' '}
                  for you!
                </Typography>
              </Box>
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
};

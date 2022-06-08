import { FC } from 'react';
import { PaletteMode, Typography, Card, Icon, Button } from '@mui/material';
import { Box } from '@mui/system';
import { useNavigate } from 'react-router-dom';
import clsx from 'clsx';

type FactProps = {
  mode: PaletteMode;
};

const facts = [
  {
    id: 'notes',
    icon: 'note',
    count: '10k',
    title: 'Notes',
    action: 'wow!',
    link: ''
  },
  {
    id: 'fav',
    icon: 'favorite_outline',
    count: '63',
    title: 'Likes',
    action: 'Like!',
    link: ''
  },
  {
    id: 'us',
    icon: 'groups',
    count: '96',
    title: 'users',
    action: 'Join us!',
    link: '/register'
  },
  {
    id: 'cup',
    icon: 'coffee',
    count: '12',
    title: 'coffees',
    action: 'Buy me a coffee!',
    link: 'https://www.buymeacoffee.com/itsmohsen'
  }
];

export const Fact: FC<FactProps> = (props) => {
  const navigate = useNavigate();

  const handleClick = (id: string, link: string) => {
    if (id === 'us') {
      return navigate(link);
    }

    if (id === 'cup') {
      return window.open(link, '_blank');
    }

    if (id === 'fav') {
    }
  };

  return (
    <Box
      component='div'
      className='flex flex-col justify-center items-center py-10 mb-5 bg-indigo-100 mt-24'
      sx={{ bgcolor: props.mode === 'light' ? '' : 'indigo' }}
    >
      <div className='flex flex-col items-center mb-10'>
        <Typography variant='h3' className='!mt-5' color='text.primary'>
          <span className='text-indigo-500'>Fun</span> Facts
        </Typography>
      </div>

      <Box component='div' className='flex flex-col md:flex-row gap-3 max-w-32 flex-wrap mb-10'>
        {facts.map((f) => (
          <Card className='!shadow-none p-10 min-w-[20rem] !rounded-3xl' key={f.icon}>
            <div className='flex flex-col md:flex-row md:items-center md:justify-center h-full'>
              <div className='flex flex-col gap-2 items-center justify-center'>
                <Icon
                  fontSize='large'
                  className={clsx('!text-6xl mb-2', {
                    '!text-indigo-500': props.mode === 'light'
                  })}
                  color='action'
                >
                  {f.icon}
                </Icon>
                <Typography
                  variant='h3'
                  className={clsx({ '!text-indigo-500': props.mode === 'light' })}
                  color='text.primary'
                >
                  {f.count}
                </Typography>
                <Typography
                  className={clsx('text-center !font-light flex-wrap max-w-lg', {
                    '!text-indigo-500': props.mode === 'light'
                  })}
                  variant='h6'
                  color='text.secondary'
                >
                  {f.title}
                </Typography>

                <Button
                  variant='outlined'
                  className='!font-mono !mt-5'
                  onClick={() => handleClick(f.id, f.link)}
                >
                  {f.action}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

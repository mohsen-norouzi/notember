import { Backdrop, Box, Button, Divider, Icon, IconButton } from '@mui/material';
import clsx from 'clsx';
import { GetLabelsQuery, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { useState } from 'react';
import { LabelItem } from './LabelItem';

export const LabelList = () => {
  const [open, setOpen] = useState(false);

  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    graphqlRequestClient,
    {}
  );

  if (isLoading) return <p>loading labels</p>;
  if (error) return <p>error loading labels</p>;

  console.log('labels', data);

  return (
    <Box className='flex justify-center'>
      <Box
        sx={{
          visibility: { xs: 'visible', sm: 'collapse' }
        }}
      >
        <IconButton
          className='bg-white'
          style={{ position: 'absolute', left: 0, top: '0' }}
          onClick={() => setOpen((isOpen) => !isOpen)}
        >
          <Icon className='material-icons-outlined' fontSize='small'>
            label
          </Icon>
        </IconButton>
      </Box>

      <Box
        className={clsx('bg-white z-20 transition-all w-60 shadow px-2 py-4 relative')}
        sx={{
          position: { xs: 'fixed', sm: 'static' },
          height: { xs: '100%', sm: 'min-content' },
          borderRadius: { xs: '0', sm: '0 1rem 1rem 0' },
          marginTop: { xs: '0', sm: '5.5rem;' },
          left: { xs: open ? '0' : '-15rem', sm: '' }
        }}
      >
        <LabelItem key='notes' title='Notes' icon='label_outlined' />
        <LabelItem key='reminders' title='Reminders' icon='notifications_active' />
        <Divider style={{ margin: '0.75rem 0' }} />

        <p className='flex-2 p-2 text-gray-600 text-sm'>Labels</p>

        {data?.labels?.data.map(({ id, attributes }) => (
          <LabelItem
            key={id}
            title={attributes?.title}
            icon={attributes?.icon!}
            color={attributes?.color}
          />
        ))}

        <LabelItem key='edit' title='Edit Labels' icon='edit_border' />
        <Divider style={{ margin: '0.75rem 0' }} />
        <LabelItem key='archive' title='Archive' icon='archive' />
      </Box>
      <Backdrop className='z-10' open={open} onClick={() => setOpen(false)} />
    </Box>
  );
};

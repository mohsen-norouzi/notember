import { Backdrop, Box, Button, Divider, Icon, IconButton } from '@mui/material';
import clsx from 'clsx';
import { GetLabelsQuery, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { useState } from 'react';
import { LabelItem } from './LabelItem';
import { LabelsDialog } from './LabelsDialog';

export const LabelList = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLabelsDialog, setShowLabelsDialog] = useState(false);

  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    graphqlRequestClient,
    {}
  );

  if (isLoading) return <p>loading labels</p>;
  if (error) return <p>error loading labels</p>;

  const onLabelClickHandler = () => {};

  return (
    <Box className='flex justify-center mt-5'>
      <Box
        sx={{
          visibility: { xs: 'visible', sm: 'collapse' }
        }}
      >
        <IconButton
          className='bg-white'
          style={{ position: 'absolute', left: 0, top: '0' }}
          onClick={() => setShowSidebar((isOpen) => !isOpen)}
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
          borderRadius: { xs: '0', sm: '0 0.5rem 0.5rem 0' },
          marginTop: { xs: '0', sm: '5.5rem;' },
          left: { xs: showSidebar ? '0' : '-15rem', sm: '' }
        }}
      >
        <LabelItem key='notes' title='Notes' icon='label_outlined' onClick={onLabelClickHandler} />
        <LabelItem
          key='reminders'
          title='Reminders'
          icon='notifications_active'
          onClick={onLabelClickHandler}
        />
        <Divider style={{ margin: '0.75rem 0' }} />

        <p className='flex-2 p-2 text-gray-600 text-sm'>Labels</p>

        {data?.labels?.data.map(({ id, attributes }) => (
          <LabelItem
            key={id}
            title={attributes?.title}
            icon={attributes?.icon!}
            color={attributes?.color}
            onClick={onLabelClickHandler}
          />
        ))}

        <LabelItem
          key='edit'
          title='Edit Labels'
          icon='edit_border'
          onClick={() => setShowLabelsDialog(true)}
        />
        <Divider style={{ margin: '0.75rem 0' }} />
        <LabelItem key='archive' title='Archive' icon='archive' onClick={onLabelClickHandler} />
      </Box>

      <LabelsDialog
        open={showLabelsDialog}
        onClose={() => setShowLabelsDialog(false)}
        labels={data?.labels?.data || []}
      />

      <Backdrop className='z-10' open={showSidebar} onClick={() => setShowSidebar(false)} />
    </Box>
  );
};

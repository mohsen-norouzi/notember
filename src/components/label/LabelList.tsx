import { Backdrop, Box, Divider, Icon, IconButton, LinearProgress, Stack } from '@mui/material';
import clsx from 'clsx';
import { GetLabelsQuery, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import React, { useState } from 'react';
import { LabelItem } from './LabelItem';
import { LabelsDialog } from './LabelsDialog';

type LabelListProps = {
  filter?: string;
  onFilter: (value?: string) => void;
};

export const LabelList: React.FC<LabelListProps> = (props) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [showLabelsDialog, setShowLabelsDialog] = useState(false);

  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    graphqlRequestClient,
    {}
  );

  if (error) return <p>error loading labels</p>;

  const onLabelClickHandler = (title?: string) => {
    if (showSidebar) {
      setShowSidebar(false);
    }

    props.onFilter(title);
  };

  return (
    <Box className='flex justify-center md:mt-5 gap-2'>
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
          <Icon fontSize='small'>label</Icon>
        </IconButton>
      </Box>

      <Box
        className={clsx(
          'bg-white z-20 transition-all w-60 shadow px-2 py-4 relative animated fadeInLeft'
        )}
        sx={{
          position: { xs: 'fixed', sm: 'static' },
          height: { xs: '100%', sm: 'min-content' },
          borderRadius: { xs: '0', sm: '1rem' },
          marginTop: { xs: '0', sm: '5.5rem;' },
          left: { xs: showSidebar ? '0' : '-15rem', sm: '' }
        }}
      >
        <LabelItem
          key='notes'
          title='Notes'
          icon='label_outlined'
          active={props.filter === ''}
          onClick={() => onLabelClickHandler('')}
        />
        <LabelItem
          key='reminders'
          title='Reminders'
          icon='notifications_active'
          onClick={() => onLabelClickHandler()}
        />

        {isLoading ? (
          <LinearProgress color='primary' className='mt-2' />
        ) : (
          <Divider style={{ margin: '0.75rem 0 0 0' }} />
        )}

        <p className='flex-2 p-2 text-gray-600 text-sm'>Labels</p>

        {data?.labels?.data.map(({ id, attributes }) => (
          <LabelItem
            key={id}
            title={attributes?.title}
            icon={attributes?.icon!}
            active={props.filter === attributes?.title}
            color={attributes?.color}
            onClick={() => onLabelClickHandler(attributes?.title)}
          />
        ))}

        <LabelItem
          key='edit'
          title='Edit Labels'
          icon='edit_border'
          onClick={() => setShowLabelsDialog(true)}
        />
        <Divider style={{ margin: '0.75rem 0' }} />
        <LabelItem
          key='archive'
          title='Archive'
          icon='archive'
          onClick={() => onLabelClickHandler()}
        />
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

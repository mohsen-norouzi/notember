import React, { useState } from 'react';
import { Box, Card, Divider, LinearProgress, Typography } from '@mui/material';
import { GetLabelsQuery, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import { LabelItem } from './LabelItem';
import { LabelsDialog } from './LabelsDialog';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { labelActions } from 'redux/slices/label-slice';
import { useSnackbar } from 'notistack';

type LabelListProps = {};

export const LabelList: React.FC<LabelListProps> = (props) => {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useAppDispatch();
  const username = useAppSelector((state) => state.user.username);
  const { show, filter, labels } = useAppSelector((state) => state.label);

  const [showLabelsDialog, setShowLabelsDialog] = useState(false);

  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    getGraphQLRequestClient(),
    { filters: { user: { username: { eq: username } } } },
    {
      onSuccess: (data) => {
        dispatch(labelActions.setLabels(data.labels?.data || []));
      },
      onError: () => {
        enqueueSnackbar('Failed to load labels.', { variant: 'error' });
      },
      retry: (failureCount, error) => {
        if (failureCount < 2) {
          enqueueSnackbar('Failed to load labels. Retrying...', { variant: 'error' });
          return true;
        }

        return false;
      },
      refetchOnWindowFocus: false,
      refetchInterval: 15 * 1000
    }
  );

  const onLabelClickHandler = (title?: string) => {
    if (show) {
      dispatch(labelActions.hideLabels());
    }

    dispatch(labelActions.setFilter(title || ''));
  };

  return (
    <Box className='block w-60 relative' component='div'>
      <Card
        className='z-20 shadow py-4 w-60 fixed overflow-auto'
        sx={{
          height: { xs: '100%', sm: 'min-content' },
          maxHeight: { xs: '100vh', sm: 'calc(100vh - 75px)' },
          borderRadius: { xs: '0', sm: '1rem' }
        }}
      >
        <LabelItem
          key='notes'
          title='Notes'
          icon='label_outlined'
          active={filter === ''}
          onClick={() => onLabelClickHandler('')}
        />
        <LabelItem
          key='reminders'
          title='Reminders'
          icon='notifications_active'
          onClick={() => onLabelClickHandler()}
        />

        {isLoading ? (
          <LinearProgress className='mt-2' />
        ) : (
          <Divider  className='my-2' />
        )}

        {error && (
          <Typography className='flex-2 px-2 mb-3 text-sm' color='error'>
            failed to load labels!
          </Typography>
        )}

        {labels.map(({ id, attributes }) => (
          <LabelItem
            key={id}
            title={attributes?.title}
            icon={attributes?.icon!}
            active={filter === attributes?.title}
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
      </Card>

      <LabelsDialog
        open={showLabelsDialog}
        onClose={() => setShowLabelsDialog(false)}
        labels={labels}
      />
    </Box>
  );
};

import { Box, Divider, LinearProgress } from '@mui/material';
import { GetLabelsQuery, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import React, { useState } from 'react';
import { LabelItem } from './LabelItem';
import { LabelsDialog } from './LabelsDialog';
import { ClientError } from 'graphql-request';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { labelActions } from 'redux/slices/label-slice';

type LabelListProps = {};

export const LabelList: React.FC<LabelListProps> = (props) => {
  const dispatch = useAppDispatch();
  const { show, filter } = useAppSelector((state) => state.label);

  const [showLabelsDialog, setShowLabelsDialog] = useState(false);

  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    getGraphQLRequestClient(),
    {},
    {
      onError: (err) => {
        // console.log('my error', err);
      },
      retry: (failureCount, error) => {
        const errorObject: ClientError = JSON.parse(JSON.stringify(error));
        console.log(errorObject);
        return true;
      }
    }
  );

  const onLabelClickHandler = (title?: string) => {
    if (show) {
      dispatch(labelActions.hideLabels());
    }

    dispatch(labelActions.setFilter(title || ''));
  };

  const handleToggleLabels = () => {
    dispatch(labelActions.toggleShowLabels());
  };

  return (
    <>
      <Box
        className='bg-white z-20 transition-all w-60 shadow px-2 py-4  animated fadeInLeftp'
        sx={{
          height: { xs: '100%', sm: 'min-content' },
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
          <LinearProgress color='primary' className='mt-2' />
        ) : (
          <Divider style={{ margin: '0.75rem 0 0 0' }} />
        )}

        <p className='flex-2 p-2 text-gray-600 text-sm'>Labels</p>

        {error && <p className='flex-2 px-2 mb-3 text-rose-400 text-sm'>failed to load labels</p>}

        {data?.labels?.data.map(({ id, attributes }) => (
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
      </Box>

      <LabelsDialog
        open={showLabelsDialog}
        onClose={() => setShowLabelsDialog(false)}
        labels={data?.labels?.data || []}
      />
    </>
  );
};

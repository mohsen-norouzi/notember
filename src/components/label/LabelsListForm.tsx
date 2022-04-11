import { FC } from 'react';
import { List } from '@mui/material';

import {
  DeleteLabelMutation,
  LabelEntity,
  LabelInput,
  UpdateLabelMutation,
  useDeleteLabelMutation,
  useUpdateLabelMutation
} from 'graphql/generated/graphql-types';
import { useQueryClient } from 'react-query';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';

import { LabelListFormItem } from './LabelListFormItem';

type LabelsFormListProps = {
  labels: LabelEntity[];
};

export const LabelsFormList: FC<LabelsFormListProps> = (props) => {
  const queryClient = useQueryClient();

  const deleteMutation = useDeleteLabelMutation<DeleteLabelMutation, Error>(graphqlRequestClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('GetLabels');
    }
  });

  const updateMutation = useUpdateLabelMutation<UpdateLabelMutation, Error>(graphqlRequestClient, {
    onSuccess: () => {
      queryClient.invalidateQueries('GetLabels');
    }
  });

  const onDeleteHandler = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const onChangeHandler = (data: LabelInput, id: string) => {
    updateMutation.mutate({ id, data });
  };

  return (
    <List sx={{ marginTop: '0.75rem' }}>
      {props.labels.map((label) => (
        <LabelListFormItem
          key={label.id}
          label={label}
          onDelete={onDeleteHandler}
          onChange={onChangeHandler}
        />
      ))}
    </List>
  );
};

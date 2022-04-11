import { FC } from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';

import {
  DeleteLabelMutation,
  LabelEntity,
  UpdateLabelMutation,
  useDeleteLabelMutation,
  useUpdateLabelMutation
} from 'graphql/generated/graphql-types';
import { useQueryClient } from 'react-query';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';

import { LabelsForm } from './LabelsForm';
import { LabelsFormList } from './LabelsListForm';

type LabelsDialogProps = {
  open: boolean;
  labels: LabelEntity[];
  onClose: () => void;
};

export const LabelsDialog: FC<LabelsDialogProps> = (props) => {
  const onCancelHandler = () => {
    props.onClose();
  };

  return (
    <Dialog
      open={props.open}
      onClose={props.onClose}
      // open={labelsDialogOpen}
    >
      <DialogTitle>Edit Labels</DialogTitle>

      <DialogContent>
        <LabelsForm />
        <LabelsFormList labels={props.labels} />
      </DialogContent>

      <DialogActions>
        <Button onClick={onCancelHandler}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

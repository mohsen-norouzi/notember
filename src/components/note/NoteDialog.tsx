import React, { FC } from 'react';

import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import { NoteForm } from './noteform';
import {
  DeleteNoteMutation,
  NoteEntity,
  NoteInput,
  UpdateNoteMutation,
  useDeleteNoteMutation,
  useUpdateNoteMutation
} from 'graphql/generated/graphql-types';
import { useQueryClient } from 'react-query';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction='up' ref={ref} {...props} />;
});

type NoteDialogProps = {
  note: NoteEntity;
  onClose: () => void;
};

export const NoteDialog: FC<NoteDialogProps> = (props) => {
  const queryClient = useQueryClient();

  const updateMutation = useUpdateNoteMutation<UpdateNoteMutation, Error>(getGraphQLRequestClient(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['GetNotes']);
      props.onClose();
    }
  });

  const deleteMutation = useDeleteNoteMutation<DeleteNoteMutation, Error>(getGraphQLRequestClient(), {
    onSuccess: () => {
      queryClient.invalidateQueries(['GetNotes']);
      props.onClose();
    }
  });

  const handleCreate = (note: NoteInput) => {
    updateMutation.mutate({ data: note, id: props.note.id! });
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

  return (
    <Dialog
      classes={{
        paper: 'w-full m-24'
      }}
      TransitionComponent={Transition}
      onClose={props.onClose}
      open={props.note !== null}
    >
      <NoteForm onCreate={handleCreate} note={props.note} onDelete={handleDelete} expanded />
    </Dialog>
  );
};

import React, { FC } from 'react';

import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import { NoteForm } from './noteform';
import {
  NoteEntity,
  NoteInput,
  UpdateNoteMutation,
  useUpdateNoteMutation
} from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { useQueryClient } from 'react-query';

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

  const { data, error, isLoading, mutate } = useUpdateNoteMutation<UpdateNoteMutation, Error>(
    graphqlRequestClient,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('GetNotes');
        props.onClose();
      }
    }
  );

  const onCreateHandler = (note: NoteInput) => {
    mutate({ data: note, id: props.note.id! });
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
      <NoteForm onCreate={onCreateHandler} note={props.note} />
    </Dialog>
  );
};

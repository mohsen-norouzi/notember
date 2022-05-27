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
  note?: NoteEntity;
  onClose: () => void;
  onSubmit?: (note: NoteInput) => void;
  onDeleteImage?: (id: string) => void;
};

export const NoteDialog: FC<NoteDialogProps> = (props) => {
  const queryClient = useQueryClient();

  const updateMutation = useUpdateNoteMutation<UpdateNoteMutation, Error>(
    getGraphQLRequestClient(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetNotes']);
        props.onClose();
      }
    }
  );

  const deleteMutation = useDeleteNoteMutation<DeleteNoteMutation, Error>(
    getGraphQLRequestClient(),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['GetNotes']);
        props.onClose();
      }
    }
  );

  const handleCreate = (note: NoteInput) => {
    if (props.note) {
      return updateMutation.mutate({ data: note, id: props.note.id! });
    }

    if (props.onSubmit) {
      return props.onSubmit(note);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const handleDeleteImage = () => {
    debugger;
    if (props.onDeleteImage && props.note && props.note.attributes?.image) {
      props.onDeleteImage(props.note.attributes?.image.data?.id!);
    }
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
      <NoteForm
        onCreate={handleCreate}
        note={props.note}
        onDelete={handleDelete}
        onDeleteImage={handleDeleteImage}
      />
    </Dialog>
  );
};

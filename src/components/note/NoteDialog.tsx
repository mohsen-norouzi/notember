import React, { FC, useState } from 'react';

import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import Slide from '@mui/material/Slide';

import { NoteForm } from './noteform';
import {
  DeleteNoteMutation,
  DeleteUploadFileMutation,
  Maybe,
  NoteEntity,
  NoteInput,
  UpdateNoteMutation,
  useDeleteNoteMutation,
  useDeleteUploadFileMutation,
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
  const [pendingImageId, setPendingImageId] = useState<Maybe<string>>(null);

  const updateMutation = useUpdateNoteMutation<UpdateNoteMutation, Error>(
    getGraphQLRequestClient()
  );

  const deleteMutation = useDeleteNoteMutation<DeleteNoteMutation, Error>(
    getGraphQLRequestClient(),
    {
      onSuccess: () => {
        handleDeleteImage();
        queryClient.invalidateQueries(['GetNotes']);
        props.onClose();
      }
    }
  );

  const deleteFileMutation = useDeleteUploadFileMutation<DeleteUploadFileMutation, Error>(
    getGraphQLRequestClient(),
    {
      onSuccess: () => queryClient.invalidateQueries(['GetNotes'])
    }
  );

  const handleDeleteImage = (id?: string) => {
    const imageID = id || props.note?.attributes?.image?.data?.id;

    if (imageID) {
      deleteFileMutation.mutate({ id: imageID });
    }
  };

  const handleSubmit = (note: NoteInput, close: boolean = true) => {
    // update
    if (props.note) {
      return updateMutation.mutate(
        { data: note, id: props.note.id! },
        {
          onSuccess: () => {
            if (close) {
              props.onClose();
            }

            queryClient.invalidateQueries(['GetNotes']);
            setPendingImageId(null);
          }
        }
      );
    }

    // new note
    if (props.onSubmit) {
      return props.onSubmit(note);
    }
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate({ id });
  };

  const handleClose = () => {
    if (pendingImageId) {
      handleDeleteImage(pendingImageId);
      setPendingImageId(null);
    }

    props.onClose();
  };

  const handleImageStore = (imageId: string) => {
    setPendingImageId(imageId);
  };

  return (
    <Dialog
      classes={{
        paper: 'w-full m-24'
      }}
      TransitionComponent={Transition}
      onClose={handleClose}
      open={props.note !== null}
    >
      <NoteForm
        onSubmit={handleSubmit}
        note={props.note}
        onDelete={handleDelete}
        onDeleteImage={handleDeleteImage}
        onStoreImage={handleImageStore}
      />
    </Dialog>
  );
};

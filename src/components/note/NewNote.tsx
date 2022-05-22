import { Box, ClickAwayListener, Fab, Icon } from '@mui/material';
import {
  CreateNoteMutation,
  NoteInput,
  useCreateNoteMutation,
  useDeleteUploadFileMutation,
  DeleteUploadFileMutation
} from 'graphql/generated/graphql-types';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { noteActions } from 'redux/slices/note-slice';
import { NoteDialog } from './NoteDialog';
import { NoteForm } from './noteform';

export const NewNote = () => {
  const queryClient = useQueryClient();
  const dispatch = useAppDispatch();
  const showNoteForm = useAppSelector((state) => state.note.showNoteForm);

  const createMutation = useCreateNoteMutation<CreateNoteMutation, Error>(
    getGraphQLRequestClient(),
    {
      onSuccess: () => queryClient.invalidateQueries(['GetNotes'])
    }
  );

  const deleteFileMutation = useDeleteUploadFileMutation<DeleteUploadFileMutation, Error>(
    getGraphQLRequestClient(),
    {}
  );

  const handleDeleteImage = (imageID: string) => {
    deleteFileMutation.mutate({ id: imageID });
  };

  const handleCreate = (note: NoteInput) => {
    const newNote = note;
    newNote.publishedAt = new Date();

    createMutation.mutate(
      { data: newNote },
      {
        onSuccess: () => {
          handleFormClose();
        },
        onError: () => {
          if (newNote.image) {
            handleDeleteImage(newNote.image);
          }
        }
      }
    );

    // dispatch(createNote(note));
  };

  const handleFormClose = () => {
    dispatch(noteActions.hideForm());
  };

  const handleFormOpen = () => {
    dispatch(noteActions.showForm());
  };

  return (
    <>
      <Box role='presentation' sx={{ position: 'fixed', bottom: 16, right: 16 }} className='z-30'>
        <Fab color='primary' size='small' aria-label='scroll back to top' onClick={handleFormOpen}>
          <Icon>add</Icon>
        </Fab>
      </Box>

      {showNoteForm && (
        <NoteDialog
          onCreate={handleCreate}
          onDeleteImage={handleDeleteImage}
          onClose={handleFormClose}
        />
      )}
    </>
  );
};

import { Box, ClickAwayListener } from '@mui/material';
import {
  CreateNoteMutation,
  NoteInput,
  useCreateNoteMutation,
  useDeleteUploadFileMutation,
  DeleteUploadFileMutation
} from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { NoteForm } from './noteform';

export const NewNote = () => {
  const queryClient = useQueryClient();
  const [showForm, setShowForm] = useState(false);

  const createMutation = useCreateNoteMutation<CreateNoteMutation, Error>(graphqlRequestClient, {
    onSuccess: () => queryClient.invalidateQueries(['GetNotes'])
  });

  const deleteFileMutation = useDeleteUploadFileMutation<DeleteUploadFileMutation, Error>(
    graphqlRequestClient,
    {}
  );

  const handleFormOpen = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

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

  const handleClickAway = (ev: any) => {
    const preventCloseElements = document.querySelector('.prevent-add-close');
    const preventClose = preventCloseElements ? preventCloseElements.contains(ev.target) : false;

    if (preventClose) {
      return;
    }

    handleFormClose();
  };

  return (
    <Box
      component='form'
      className='flex justify-center justify-items-stretch mt-5 animated fadeInDown'
    >
      <div className='shadow flex flex-col w-10/12 md:w-5/12 rounded-2xl'>
        <ClickAwayListener onClickAway={handleClickAway}>
          <div className='w-full' onClick={handleFormOpen}>
            <NoteForm
              onCreate={handleCreate}
              onDeleteImage={handleDeleteImage}
              expanded={showForm}
            />
          </div>
        </ClickAwayListener>
      </div>
    </Box>
  );
};

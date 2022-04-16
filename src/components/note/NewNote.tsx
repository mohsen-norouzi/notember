import { Box, ClickAwayListener, Typography } from '@mui/material';
import {
  CreateNoteMutation,
  NoteInput,
  useCreateNoteMutation
} from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { useState } from 'react';
import { useQueryClient } from 'react-query';
import { NoteForm } from './noteform';

export const NewNote = () => {
  const queryClient = useQueryClient();

  const createMutation = useCreateNoteMutation<CreateNoteMutation, Error>(graphqlRequestClient, {
    onSuccess: () => queryClient.invalidateQueries('GetNotes')
  });

  const [showForm, setShowForm] = useState(false);

  const handleFormOpen = () => {
    setShowForm(true);
  };

  const handleFormClose = () => {
    if (!showForm) {
      return;
    }

    setShowForm(false);
  };

  const handleCreate = (note: NoteInput) => {
    const newNote = note;
    newNote.publishedAt = new Date();
    createMutation.mutate({ data: newNote });
    // dispatch(createNote(note));
    handleFormClose();
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
    <Box component='form' className='flex justify-center justify-items-stretch mt-5 animated fadeInDown'>
      <div className='shadow flex flex-col w-10/12 md:w-5/12 rounded-2xl'>
        {showForm ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className='w-full'>
              <NoteForm onCreate={handleCreate} />
            </div>
          </ClickAwayListener>
        ) : (
          <Typography
            className='w-full rounded-2xl p-5 text-16 bg-white'
            color='textSecondary'
            onClick={handleFormOpen}
          >
            Take a note...
          </Typography>
        )}
      </div>
    </Box>
  );
};

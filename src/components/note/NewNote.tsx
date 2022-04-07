import { Box, ClickAwayListener, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import { NoteForm } from './noteform';

export const NewNote = () => {
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

  const handleClickAway = (ev: any) => {
    const preventCloseElements = document.querySelector('.prevent-add-close');
    const preventClose = preventCloseElements ? preventCloseElements.contains(ev.target) : false;

    if (preventClose) {
      return;
    }

    handleFormClose();
  };

  return (
    <Box component='form' className='flex justify-center justify-items-stretch'>
      <div className='shadow flex flex-col w-5/12 rounded-2xl'>
        {showForm ? (
          <ClickAwayListener onClickAway={handleClickAway}>
            <div className='w-full'>
              <NoteForm />
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

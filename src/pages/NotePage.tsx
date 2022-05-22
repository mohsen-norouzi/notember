import { LabelList, NewNote, NoteList } from 'components';
import { useState } from 'react';
import Box from '@mui/material/Box';

export const NotePage = () => {
  return (
    <div className='flex gap-2 mx-2'>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LabelList />
      </Box>

      {/* <NewNote /> */}
      <NoteList />
    </div>
  );
};

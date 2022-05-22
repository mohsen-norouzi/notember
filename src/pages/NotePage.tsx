import { LabelList, NewNote, NoteList } from 'components';
import { useState } from 'react';
import Box from '@mui/material/Box';

export const NotePage = () => {
  const [filter, setFilter] = useState<string | undefined>('');

  const handleFilterChange = (value?: string) => {
    setFilter(value);
  };

  return (
    <div className='flex gap-2 mx-2'>
      <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
        <LabelList onFilter={handleFilterChange} filter={filter} />
      </Box>

      {/* <NewNote /> */}
      <NoteList filter={filter} />
    </div>
  );
};

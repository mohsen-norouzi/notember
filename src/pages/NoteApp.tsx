import { Backdrop } from '@mui/material';
import { LabelList, NewNote, NoteList } from 'components';

export const NoteApp = () => {
  return (
    <div className='flex space-x-2 h-screen'>
      <LabelList />

      <div className='flex flex-col flex-auto space-y-5'>
        <NewNote />
        <NoteList />
      </div>
    </div>
  );
};

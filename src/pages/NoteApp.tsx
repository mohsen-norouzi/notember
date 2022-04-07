import { LabelList, NewNote, NoteList } from 'components';

export const NoteApp = () => {
  return (
    <div className='flex space-x-5'>
      <div className='flex justify-center pt-5'>
        <LabelList />
      </div>

      <div className='flex flex-col flex-auto space-y-5'>
        <NewNote />
        <NoteList />
      </div>
    </div>
  );
};

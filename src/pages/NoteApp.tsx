import { LabelList, NoteList } from 'components';

export const NoteApp = () => {
  return (
    <div className='flex space-x-5'>
      <div className='flex items-center justify-center pt-5'>
        <LabelList />
      </div>

      <div className='flex flex-auto'>
        <NoteList />
      </div>
    </div>
  );
};

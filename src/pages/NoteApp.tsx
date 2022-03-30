import { LabelList, NoteList } from 'components';

export const NoteApp = () => {
  return (
    <div className='flex'>
      <div>
        <LabelList />
      </div>

      <div className='flex-1'>
        <NoteList />
      </div>
    </div>
  );
};

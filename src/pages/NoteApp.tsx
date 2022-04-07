import { LabelList, NoteList } from 'components';

export const NoteApp = () => {
  return (
    <div className='flex'>
      <div className='flex-shrink'>
        <LabelList />
      </div>

      <div className='flex-auto'>
        <NoteList />
      </div>
    </div>
  );
};

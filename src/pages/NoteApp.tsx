import { LabelList } from 'components/label';
import { NoteList } from 'components/note';

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

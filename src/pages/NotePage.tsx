import { LabelList, NewNote, NoteList } from 'components';
import { useState } from 'react';

export const NotePage = () => {
  const [filter, setFilter] = useState<string | undefined>('');

  const handleFilterChange = (value?: string) => {
    setFilter(value);
  };

  return (
    <div className='flex gap-2 min-h-screen'>
      <LabelList onFilter={handleFilterChange} filter={filter} />

      <div className='flex flex-col flex-auto space-y-5'>
        <NewNote />
        <NoteList filter={filter} />
      </div>
    </div>
  );
};
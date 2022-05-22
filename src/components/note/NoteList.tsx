import { FC, useEffect, useState } from 'react';
import Masonry from '@mui/lab/Masonry';

import {
  GetNotesQuery,
  Maybe,
  NoteEntity,
  useGetNotesQuery
} from 'graphql/generated/graphql-types';

import { NoteItem } from './NoteItem';
import { NoteDialog } from './NoteDialog';
import { Skeleton, Stack, Typography } from '@mui/material';
import { getGraphQLRequestClient } from 'lib/clients/GraphqlRequestClient';
import { useAppSelector } from 'redux/hooks';

type NoteListProps = {};

export const NoteList: FC<NoteListProps> = (props) => {
  const filter = useAppSelector((state) => state.label.filter);

  const [selectedNote, setSelectedNote] = useState<Maybe<NoteEntity>>(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    let filterData = filter ? { labels: { title: { eq: filter } } } : {};

    setFilters(filterData);
  }, [filter]);

  const { data, error, isLoading } = useGetNotesQuery<GetNotesQuery, Error>(
    getGraphQLRequestClient(),
    {
      filters
    }
  );

  if (error) {
    return (
      <div className='flex flex-col items-center justify-center h-full'>
        <Typography color='textSecondary' variant='h1'>
          {': ('}
        </Typography>

        <Typography color='textSecondary' variant='h5'>
          Failed to load notes!
        </Typography>
      </div>
    );
  }

  if (data && data.notes && data.notes.data.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-auto mt-5'>
        <Typography color='textSecondary' variant='h5'>
          There are no notes!
        </Typography>
      </div>
    );
  }

  if (isLoading || !data || !data.notes || !data.notes.data) {
    return (
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }} sx={{ alignContent: 'flex-start' }}>
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <Stack spacing={1} key={i}>
            <Skeleton variant='rectangular' width='100%' height='40vh' className='rounded-md' />
          </Stack>
        ))}
      </Masonry>
    );
  }

  return (
    <>
      <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }} sx={{ alignContent: 'flex-start' }}>
        {data.notes.data.map((note) => (
          <NoteItem key={note.id} note={note} onClick={(note) => setSelectedNote(note)} />
        ))}
      </Masonry>

      {selectedNote && (
        <NoteDialog note={selectedNote || null} onClose={() => setSelectedNote(null)} />
      )}
    </>
  );
};

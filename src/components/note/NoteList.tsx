import { FC, useEffect, useState } from 'react';
import Masonry from '@mui/lab/Masonry';

import {
  GetNotesQuery,
  Maybe,
  NoteEntity,
  useGetNotesQuery
} from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';

import { NoteItem } from './NoteItem';
import { NoteDialog } from './NoteDialog';
import { Typography } from '@mui/material';

type NoteListProps = {
  filter?: string;
};

export const NoteList: FC<NoteListProps> = (props) => {
  const [selectedNote, setSelectedNote] = useState<Maybe<NoteEntity>>(null);
  const [filters, setFilters] = useState({});

  useEffect(() => {
    let filterData = props.filter ? { labels: { title: { eq: props.filter } } } : {};

    setFilters(filterData);
  }, [props.filter]);

  const { data, error, isLoading } = useGetNotesQuery<GetNotesQuery, Error>(graphqlRequestClient, {
    filters
  });

  if (isLoading) return <p>loading notes</p>;
  if (error) return <p>error loading notes</p>;

  if (!data || !data.notes || data.notes.data.length === 0) {
    return (
      <div className='flex items-center justify-center h-full'>
        <Typography color='textSecondary' variant='h5'>
          There are no notes!
        </Typography>
      </div>
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

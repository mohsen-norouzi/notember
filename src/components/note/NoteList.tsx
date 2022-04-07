import { GetNotesQuery, useGetNotesQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';

import Masonry from '@mui/lab/Masonry';

import { NoteItem } from './NoteItem';

export const NoteList = () => {
  const { data, error, isLoading } = useGetNotesQuery<GetNotesQuery, Error>(
    graphqlRequestClient,
    {}
  );

  if (isLoading) return <p>loading notes</p>;
  if (error) return <p>error loading notes</p>;

  console.log('notes', data);

  if (!data || !data.notes || data.notes.data.length === 0) {
    return <p>There are no notes!</p>;
  }

  return (
    <Masonry columns={{ xs: 1, sm: 2, md: 3, lg: 4, xl: 4 }} sx={{ alignContent: 'flex-start' }}>
      {data.notes.data.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </Masonry>
  );
};

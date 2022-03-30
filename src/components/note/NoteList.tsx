import { GetNotesQuery, useGetNotesQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { NoteItem } from './NoteItem';

export const NoteList = () => {
  const { data, error, isLoading } = useGetNotesQuery<GetNotesQuery, Error>(
    graphqlRequestClient,
    {}
  );

  if (isLoading) return <p>loading notes</p>;
  if (error) return <p>error loading notes</p>;

  console.log('notes', data);

  return (
    <ul>
      {data?.notes?.data.map((note) => (
        <NoteItem key={note.id} note={note} />
      ))}
    </ul>
  );
};

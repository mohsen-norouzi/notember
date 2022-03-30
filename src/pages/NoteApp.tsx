import { LabelList } from 'components/label';
import { GetNotesQuery, useGetNotesQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';

export const NoteApp = () => {
  const { data, error, isLoading } = useGetNotesQuery<GetNotesQuery, Error>(
    graphqlRequestClient,
    {}
  );

  console.log('data', data);

  return (
    <div>
      NoteApp
      <LabelList />
    </div>
  );
};

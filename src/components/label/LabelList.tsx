import { GetLabelsQuery, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';
import { LabelItem } from './LabelItem';

export const LabelList = () => {
  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    graphqlRequestClient,
    {}
  );

  if (isLoading) return <p>loading labels</p>;
  if (error) return <p>error loading labels</p>;

  console.log('labels', data);

  return (
    <ul>
      {data?.labels?.data.map((label) => (
        <LabelItem key={label.id} label={label} />
      ))}
    </ul>
  );
};

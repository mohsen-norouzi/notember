import { GetLabelsQuery, useGetLabelsQuery } from 'graphql/generated/graphql-types';
import graphqlRequestClient from 'lib/clients/GraphqlRequestClient';

export const LabelList = () => {
  const { data, error, isLoading } = useGetLabelsQuery<GetLabelsQuery, Error>(
    graphqlRequestClient,
    {}
  );

  console.log('labels', data);

  return <div>LabelList</div>;
};

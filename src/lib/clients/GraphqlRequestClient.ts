import { GraphQLClient } from 'graphql-request';

const graphqlRequestClient = new GraphQLClient(import.meta.env.VITE_GRAPHQL_ENDPOINT + '/graphql');

export const getGraphQLRequestClient = (useToken: boolean = true) => {
  if (useToken) {
    const token = localStorage.getItem('jwt');

    const requestHeaders = {
      authorization: `Bearer ${token}`
    };

    graphqlRequestClient.setHeaders(requestHeaders);
  } else {
    graphqlRequestClient.setHeaders({});
  }

  return graphqlRequestClient;
};

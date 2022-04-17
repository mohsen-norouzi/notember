import { GraphQLClient } from 'graphql-request';

const requestHeaders = {
  authorization: 'Bearer USER_TOKEN'
};

const graphqlRequestClient = new GraphQLClient(
  import.meta.env.VITE_GRAPHQL_ENDPOINT + '/graphql'
  // , {
  //   headers: requestHeaders
  // }
);

export default graphqlRequestClient;

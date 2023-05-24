import { ApolloClient, InMemoryCache } from "@apollo/client";

const client = new ApolloClient({
  uri: "/api/graphql",
  cache: new InMemoryCache(),
  headers: {
    "Apollo-Require-Preflight": "false",
  },
});

export default client;

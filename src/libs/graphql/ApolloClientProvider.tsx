import React, { ReactElement, ReactNode } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getAccessToken } from "@auth0/nextjs-auth0";

/**
 * ApolloProvider with the client
 */
export default function ApolloClientProvider({
  children,
}: {
  children: ReactNode;
}): ReactElement {

  const client = React.useMemo(() => {
    const httpLink = new HttpLink({
      uri: "http://localhost:3100/graphql",
    });

    return new ApolloClient({
      link: from([httpLink]),
      cache: new InMemoryCache(),
    });
  }, []);

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

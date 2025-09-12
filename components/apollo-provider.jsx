"use client";
import { ApolloProvider } from "@apollo/client";

import { apolloClient } from "@/lib/apollo";

export default function ApolloProviderWrapper({ children }) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}

"use client";
import { ApolloProvider } from "@apollo/client";

import { createApolloClient } from "@/lib/apollo";

export default function ApolloProviderWrapper({ children }) {
  return (
    <ApolloProvider client={createApolloClient}>{children}</ApolloProvider>
  );
}

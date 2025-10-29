"use client";

import { ApolloProvider } from "@apollo/client";
import { useState, useEffect } from "react";
import { createApolloClient } from "@/lib/apollo";

export default function ApolloProviderWrapper({ children }) {
  const [client, setClient] = useState(null);

  useEffect(() => {
    const client = createApolloClient();
    setClient(client);
  }, []);

  if (!client) return null;

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}

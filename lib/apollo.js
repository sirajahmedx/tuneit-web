import { ApolloClient, HttpLink, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { getCookie, hasCookie } from "cookies-next";

const errorLink = onError(({ networkError, graphQLErrors }) => {
  if (networkError) {
    console.error("Network error:", networkError);
  }
  if (graphQLErrors) {
    console.error("GraphQL Errors:", graphQLErrors);
  }
});

export const createApolloClient = () => {
  const httpLink = new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,
    credentials: "include",
    headers: hasCookie("token")
      ? {
          token: getCookie("token"),
        }
      : {},
  });

  return new ApolloClient({
    link: from([errorLink, httpLink]),
    cache: new InMemoryCache({
      addTypename: false,
    }),
    defaultOptions: {
      mutate: {
        errorPolicy: "all",
      },
    },
  });
};

export const apolloClient = createApolloClient();

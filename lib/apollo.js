import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { getCookie, hasCookie } from "cookies-next";

export const createApolloClient = new ApolloClient({
  link: new HttpLink({
    uri: process.env.NEXT_PUBLIC_API_URL,

    headers: hasCookie("token")
      ? {
          token: hasCookie("token") && getCookie("token"),
        }
      : {},
  }),
  cache: new InMemoryCache({
    addTypename: false,
  }),
});

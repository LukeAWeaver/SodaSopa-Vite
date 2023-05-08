import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import store from "@/store";
const httpLink = createHttpLink({
  uri: import.meta.env.VITE_GRAPHQL_API_URL,
});

const authLink = setContext((_, { headers }) => {
  const { user: userSelector } = store.getState();
  const user = userSelector.user;
  if (!user) {
    throw new Error("user is undefined");
  }
  const { googleIdToken } = user;

  if (!googleIdToken || googleIdToken?.length < 1) {
    throw new Error("GoogleIdToken is undefined");
  }

  return {
    headers: {
      ...headers,
      "x-api-key": import.meta.env.VITE_API_KEY,
      "google-id-token": googleIdToken,
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;

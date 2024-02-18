import { Provider } from 'react-redux'
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:3001/graphql',
  cache: new InMemoryCache(),
});

import UserBox from "./components/UserBox";
// import rootReducer from './reducers'

// const store = createStore(rootReducer, applyMiddleware(thunk))

export default function App() {
  return (
    <ApolloProvider client={client}>
      <UserBox />
      </ApolloProvider >
  );
}
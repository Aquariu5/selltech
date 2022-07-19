import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import axios from 'axios';

const httpLink = createHttpLink({
    uri: 'http://152.228.215.94:81/api',
  });
  
const authLink = setContext( async (_, { headers }) => {
    // get the authentication token from local storage if it exists
    let token = localStorage.getItem('token');
    if (!token) {
       token = (await axios.post('http://152.228.215.94:81/auth/login', { email: 'test@test.com', password: '1234567Qa' })).data.access_token;
    }
    return {
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : "",
      }
    }
  });
  
export const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });
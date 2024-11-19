import client from '@/apollo/apolloClient';
import Footer from '@/components/Footer';
import Navbar from '@/components/NavBar';
import { UserRoleProvider } from '@/context/useRoleContext';

import { store } from '@/redux';
import '@/styles/globals.css';
import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import { Provider } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <UserRoleProvider>
          <Navbar isAdmin={true} />
          <Component {...pageProps} />
          <Footer />
          <ToastContainer />
        </UserRoleProvider>
      </Provider>
    </ApolloProvider>
  );
}

import './App.css';

import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { Provider } from 'react-redux';
import { store } from 'redux/store';

import { LoginPage, NotePage, ProfilePage, RegisterPage } from 'pages';
import { Layout } from 'components';
import { Auth } from 'components/auth';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000
    }
  }
});

const App = () => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <Auth>
          <Layout>
            <Routes>
              <Route path='/' element={<NotePage />} />
              <Route path='/login' element={<LoginPage />} />
              <Route path='/register' element={<RegisterPage />} />
              <Route path='/profile' element={<ProfilePage />} />
            </Routes>
          </Layout>
          <ReactQueryDevtools />
        </Auth>
      </QueryClientProvider>
    </Provider>
  );
};

export default App;

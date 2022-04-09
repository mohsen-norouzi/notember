import './App.css';

import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { NoteApp } from 'pages';
import { Layout } from 'components';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 1000
    }
  }
});

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path='/' element={<NoteApp />} />
        </Routes>
      </Layout>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;

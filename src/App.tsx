import './App.css';

import { Layout } from 'components/ui';
import { Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { NoteApp } from 'pages';

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
    </QueryClientProvider>
  );
};

export default App;

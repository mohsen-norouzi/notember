import './App.css';

import { Layout } from 'components/ui';
import { Route, Routes } from 'react-router-dom';
import { NoteApp } from 'pages';

const App = () => {
  return (
    <Layout>
      <Routes>
        <Route path='/' element={<NoteApp />} />
      </Routes>
    </Layout>
  );
};

export default App;

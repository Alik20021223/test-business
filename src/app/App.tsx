import { Route, Routes } from 'react-router-dom';
import MainLayout from './layout/defaultLayout';
import MainPage from '@pages/main-page';

function App() {
  return (
    <>
      <Routes>
        {/* Родительский маршрут с layout */}
        <Route path='/' element={<MainLayout />}>
          <Route path='/' element={<MainPage />} />
        </Route>
      </Routes>
      <Routes></Routes>
    </>
  );
}

export default App;

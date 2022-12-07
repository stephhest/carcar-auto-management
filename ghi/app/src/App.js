import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ManufacturerList from './ManufacturerList';
import ModelList from './ModelList';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/models" element={<ModelList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

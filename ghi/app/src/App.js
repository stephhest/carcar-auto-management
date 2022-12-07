import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AutomobileForm from './AutomobileForm';
import MainPage from './MainPage';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';
import Nav from './Nav';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<MainPage />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route index element={<MainPage />} />
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<MainPage />} />
            <Route path="new" element={<AutomobileForm />} />
          </Route>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import MainPage from './MainPage';
import ManufacturerList from './ManufacturerList';
import ModelList from './ModelList';
import Nav from './Nav';
import ServiceAppointmentForm from './ServiceAppointmentForm';
import ServiceAppointmentList from './ServiceAppointmentList';
import TechnicianForm from './TechnicianForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/service/appointment/new" element={<ServiceAppointmentForm />} />
          <Route path="/service/all_appointments" element={<ServiceAppointmentList />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

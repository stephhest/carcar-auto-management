import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AutosList from './AutosList';
import AutoForm from './AutoForm';
import ManufacturerForm from './ManufacturerForm';
import ModelForm from './ModelForm';
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
<<<<<<< ghi/app/src/App.js
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/service/appointment/new" element={<ServiceAppointmentForm />} />
          <Route path="/service/all_appointments" element={<ServiceAppointmentList />} />
=======
          <Route path="manufacturers">
            <Route index element={<MainPage />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          // Added Kayre ROutes -----------------------------------------
          <Route path="/manufacturers" element={<ManufacturerList />} />
          <Route path="/models" element={<ModelList />} />
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/service/appointment/new" element={<ServiceAppointmentForm />} />
          <Route path="/service/all_appointments" element={<ServiceAppointmentList />} />
          // -----------------------------------------------------------------------------
          <Route path="models">
            <Route index element={<MainPage />} />
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutosList />} />
            <Route path="new" element={<AutoForm />} />
          </Route>
>>>>>>> ghi/app/src/App.js
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

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
import SalesPersonForm from './SalesPersonForm';
import CustomerForm from './CustomerForm';
import SaleRecordForm from './SaleRecordForm';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="models">
            <Route index element={<ModelList />} />
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="automobiles">
            <Route index element={<AutosList />} />
            <Route path="new" element={<AutoForm />} />
          </Route>
          <Route path="service">
            <Route index element={<ServiceAppointmentList />} />
            <Route path="new" element={<ServiceAppointmentForm />} />
          </Route>
          <Route path="/technicians/new" element={<TechnicianForm />} />
          <Route path="/salespeople/new" element={<SalesPersonForm />} />
          <Route path="/customers/new" element={<CustomerForm />} />
          <Route path="/sales/new" element={<SaleRecordForm />} />

        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

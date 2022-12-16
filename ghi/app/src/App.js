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
import SalesList from './SalesList';
import SalesHistoryList from './SalesPersonHistory';
import ServiceHistoryList from './ServiceHistory';
import ServiceCalendar from './ServiceCalendar';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <div className="container">
        <Routes>
          <Route path="/" element={<MainPage />} />
          {/* INVENTORY */}
          <Route path="inventory/manufacturers">
            <Route index element={<ManufacturerList />} />
            <Route path="new" element={<ManufacturerForm />} />
          </Route>
          <Route path="inventory/models">
            <Route index element={<ModelList />} />
            <Route path="new" element={<ModelForm />} />
          </Route>
          <Route path="inventory/automobiles">
            <Route index element={<AutosList />} />
            <Route path="new" element={<AutoForm />} />
          </Route>
          {/* SERVICE */}
          <Route path="service/appointments">
            <Route index element={<ServiceAppointmentList />} />
            <Route path="new" element={<ServiceAppointmentForm />} />
            <Route path="vin" element={<ServiceHistoryList />} />
            <Route path="calendar" element={<ServiceCalendar />} />
          </Route>
          <Route path="/service/technicians/new" element={<TechnicianForm />} />
          {/* SALES */}
          <Route path="sales">
            <Route index element={<SalesList />} />
            <Route path="new" element={<SaleRecordForm />} />
          </Route>
          <Route path="sales/salespeople">
            <Route index element={<SalesHistoryList />} />
            <Route path="new" element={<SalesPersonForm />} />
          </Route>
          <Route path="/sales/customers/new" element={<CustomerForm />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;

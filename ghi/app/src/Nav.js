import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './index.css';

function Nav() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavLink className="navbar-brand" to="/">CarCar</NavLink>
          <NavLink className="nav-button" to="/">Home</NavLink>
          <Dropdown>
            <Dropdown.Toggle className="nav-button" variant="dark" id="dropdown-basic">
              Inventory
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item className="dropdown-item" href="/inventory/automobiles">Automobiles</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/inventory/manufacturers">Manufacturers</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/inventory/models">Vehicle Models</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle className="nav-button" variant="dark" id="dropdown-basic">
              Service
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item className="dropdown-item" href="/service/technicians/new">New Technician</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/service/appointments">View All Appointments</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/service/appointments/vin">Service History</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/service/appointments/calendar">Calendar</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>

          <Dropdown>
            <Dropdown.Toggle className="nav-button" variant="dark" id="dropdown-basic">
              Sales
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item className="dropdown-item" href="/sales/customers/new">New Customer</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/sales">View All Sales</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/sales/salespeople">Sales Person History</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Nav;

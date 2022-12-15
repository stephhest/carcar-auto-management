import { NavLink } from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import './index.css';

function Nav() {
  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <NavLink className="navbar-brand" to="/">CarCar</NavLink>
          <Dropdown>
            <Dropdown.Toggle className="nav-button" variant="success" id="dropdown-basic">
              Inventory
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              <Dropdown.Item className="dropdown-item" href="/automobiles">Automobiles</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/manufacturers">Manufacturers</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/models">Vehicle Models</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle className="nav-button" variant="success" id="dropdown-basic">
              Service
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              {/* <Dropdown.Item to="/technicians">Technicians</Dropdown.Item> */}
              <Dropdown.Item className="dropdown-item" href="/technicians/new">Add Technician</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/service/vin">Service History</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/appointments">Appointments</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle className="nav-button" variant="success" id="dropdown-basic">
              Sales
            </Dropdown.Toggle>
            <Dropdown.Menu className="dropdown-menu">
              {/* <Dropdown.Item to="/customers">Customers</Dropdown.Item> */}
              <Dropdown.Item className="dropdown-item" href="/customers/new">Add Customer</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/salespeople">Sales Person History</Dropdown.Item>
              <Dropdown.Item className="dropdown-item" href="/sales">Sales</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Nav;

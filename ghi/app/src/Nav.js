import { Link, NavLink } from 'react-router-dom';
import { useState } from 'react';
import './index.css';

function Nav() {
  const [inventoryMenuVisible, setInventoryMenuVisible] = useState(false);
  const [serviceMenuVisible, setServiceMenuVisible] = useState(false);
  const [salesMenuVisible, setSalesMenuVisible] = useState(false);

  return (
    <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* ---------- INVENTORY ---------- */}
            <li className="nav-button">
              <button className="btn btn-success" id="nav-button" onClick={() => setInventoryMenuVisible(!inventoryMenuVisible)} >Inventory</button>
              <ul style={{display: inventoryMenuVisible ? 'block' : 'none'}}>
                <li className="nav-item">
                  <Link className="nav-link" to="/automobiles">Automobiles</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/manufacturers">Manufacturers</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/models">Vehicle Models</Link>
                </li>
              </ul>
            </li>
            {/* ---------- SERVICE ---------- */}
            <li className="nav-button">
              <button className="btn btn-success" id="nav-button" onClick={() => setServiceMenuVisible(!serviceMenuVisible)} >Service</button>
              <ul style={{display: serviceMenuVisible ? 'block' : 'none'}}>
                <li className="nav-item">
                  <Link className="nav-link" to="/technicians/new">Add Technician</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="appointments/new">New Appointment</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/appointments">All Appointments</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/service/vin">Service History</Link>
                </li>
              </ul>
            </li>
            {/* ---------- SALES ---------- */}
            <li className="nav-button">
              <button className="btn btn-success" id="nav-button" onClick={() => setSalesMenuVisible(!salesMenuVisible)} >Sales</button>
              <ul style={{display: salesMenuVisible ? 'block' : 'none'}}>
                <li className="nav-item">
                  <Link className="nav-link" to="/salespeople/new">Add Sales Person</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/customers/new">Add Customer</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sales/new">New Sale Record</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/sales">All Sales</Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link" to="/salespeople">Sales Person History</Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    </>
  )
}

export default Nav;

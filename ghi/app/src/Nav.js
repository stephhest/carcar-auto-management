import { NavLink } from 'react-router-dom';

function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-success">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CarCar</NavLink>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
            </li>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/manufacturers">Manufacturers</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/models">Vehicle Models</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/technicians/new">Create Technician</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="appointments/new">New Service Appointment</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/appointments">All Appointments</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/automobiles">Inventory</NavLink>
            <li className="nav-item"></li>
              <NavLink className="nav-link" to="/service/vin">VIN Appointments</NavLink>
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Nav;
